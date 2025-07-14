const Rescue = require('../models/Rescue');

exports.getAllRescues = async (req, res) => {
  try {
    const rescues = await Rescue.find();
    res.json(rescues);
  } catch (err) {
    console.error('Get rescues error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRescueById = async (req, res) => {
  try {
    const rescue = await Rescue.findById(req.params.id);
    if (!rescue) return res.status(404).json({ message: 'Rescue not found' });
    res.json(rescue);
  } catch (err) {
    console.error('Get rescue by ID error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createRescue = async (req, res) => {
  try {
    const rescue = new Rescue(req.body);
    await rescue.save();
    res.status(201).json(rescue);
  } catch (err) {
    console.error('Create rescue error:', err);
    res.status(400).json({ message: 'Bad request' });
  }
};

exports.updateRescue = async (req, res) => {
  try {
    const rescue = await Rescue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rescue) return res.status(404).json({ message: 'Rescue not found' });
    res.json(rescue);
  } catch (err) {
    console.error('Update rescue error:', err);
    res.status(400).json({ message: 'Bad request' });
  }
};

exports.deleteRescue = async (req, res) => {
  try {
    const rescue = await Rescue.findByIdAndDelete(req.params.id);
    if (!rescue) return res.status(404).json({ message: 'Rescue not found' });
    res.status(204).send();
  } catch (err) {
    console.error('Delete rescue error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
