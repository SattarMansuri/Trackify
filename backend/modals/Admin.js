const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
      lastName: {
      type: String,
      required: true
    },
    country: {
       type: String,
       enum: ["China", "India", "United States", "Indonesia", "Pakistan", "Nigeria", "Brazil", "Bangladesh", "Russia", "Mexico", "Ethiopia", "Philippines", "Egypt", "Vietnam", "DR Congo", "Turkey", "Iran", "Germany", "Thailand", "United Kingdom"],
       required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
