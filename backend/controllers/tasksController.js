const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    console.error('Eroare la getTasks:', err);
    res.status(500).json({ error: 'Eroare server.', details: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const text = (req.body.text || '').trim();
    if (!text) {
      return res.status(400).json({ error: 'Textul task-ului nu poate fi gol.' });
    }
    const task = await Task.create({ text });
    res.status(201).json(task);
  } catch (err) {
    console.error('Eroare la createTask:', err);
    res.status(500).json({ error: 'Eroare server.', details: err.message });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const text = (req.body.text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'Textul task-ului nu poate fi gol.' });
  }
  const task = await Task.findByIdAndUpdate(id, { text }, { new: true });
  if (!task) {
    return res.status(404).json({ error: 'Task inexistent.' });
  }
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ error: 'Task inexistent.' });
  }
  res.status(204).end();
};
