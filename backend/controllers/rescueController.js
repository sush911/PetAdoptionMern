const Rescue = require('../models/Rescue');

exports.getAllRescues = async (req, res) => {
  try {
    const rescues = await Rescue.find();
    res.json(rescues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRescueById = async (req, res) => {
  try {
    const rescue = await Rescue.findById(req.params.id);
    if (!rescue) return res.status(404).json({ message: 'Rescue not found' });
    res.json(rescue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRescue = async (req, res) => {
  try {
    const rescue = new Rescue(req.body);
    await rescue.save();
    res.status(201).json(rescue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRescue = async (req, res) => {
  try {
    const rescue = await Rescue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rescue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRescue = async (req, res) => {
  try {
    await Rescue.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
