const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
      company: {
      type: String,
      required: true
    },
   date: {
      type: String,
      required: true,
    },
    assignTo: {
        type: Array,
    },
    about: {
      type: String,
      required: true,
      minlength: 30,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    }
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
