const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
      lastName: {
      type: String,
      required: true
    },
     mailId: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
       type: String,
       enum: ["China", "India", "United States", "Indonesia", "Japan", "Nigeria", "Brazil", "Bangladesh", "Russia", "Mexico", "Ethiopia", "Philippines", "Egypt", "Vietnam", "DR Congo", "Turkey", "Iran", "Germany", "Thailand", "United Kingdom"],
       required: true
    },
   role: {
     type: String,
       enum: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Project Manager", "Product Manager", "Data Scientist", "DevOps Engineer", "QA Engineer", "Mobile App Developer", "Cloud Architect", "Cybersecurity Analyst", "Machine Learning Engineer", "AI Researcher", "Systems Analyst", "Business Analyst", "Technical Writer", "Database Administrator", "Network Engineer", "Game Developer", "IT Support Specialist", "Scrum Master", "Solution Architect", "Web Designer", "Blockchain Developer", "Site Reliability Engineer", "SEO Specialist", "AR/VR Developer", "Embedded Systems Engineer"],
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
  },
  projects: {
    type: Array,
    maxlength: 4
  }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
