const router = require('express').Router();
const Adoption = require('../models/Adoption');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  const { petId, name, email, phone, address, message } = req.body;

  if (!petId || !name || !email) {
    return res.status(400).json({ message: 'Pet ID, name, and email are required' });
  }

  const newAd = new Adoption({
    petId,
    petName: req.body.petName || '',
    name,
    email,
    phone,    // ✅ include phone
    address,  // ✅ include address
    message,
  });

  await newAd.save();
  res.status(201).json(newAd);
});


router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  const list = await Adoption.find().sort({ createdAt: -1 });
  res.json(list);
});

router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { status } = req.body;
  const ad = await Adoption.findById(req.params.id);
  if (!ad) return res.status(404).json({ message: 'Not found' });
  ad.status = status;
  await ad.save();
  res.json(ad);
});
router.delete('/:id', async (req, res) => {
  try {
    await Adoption.findByIdAndDelete(req.params.id);
    res.json({ message: 'Adoption request deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete adoption request' });
  }
});


module.exports = router; // ✅ Make sure this line exists
