const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
     date: {
      type: String,
      required: true
    },
    status: {
       type: String,
       enum: ["Not Started", "In Progress", "Completed", "Blocked", "On Hold", "Cancelled", "Deferred", "Waiting for Review", "Approved", "Rejected", "Archived", "Reopened"],
       required: true
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

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
