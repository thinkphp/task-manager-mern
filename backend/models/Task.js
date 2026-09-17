const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Task', taskSchema);
