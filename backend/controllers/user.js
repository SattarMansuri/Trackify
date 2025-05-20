const User = require('../modals/User')

const createUser = async (req, res)=>{
  try {
    const {firstName, lastName, mailId, country, role, about, projects } = req.body
    if(!firstName || !lastName || !mailId || !country || !role || !about){
    return res.status(400).json({message: "Details are required", success: false})
    }
    if(projects && projects.length > 4){
       return res.status(400).json({message: "Maximum project cannot be more than 4", success: false})
    }
    isExisting = await User.findOne({mailId: mailId})
    if(isExisting){
     return res.status(400).json({message: "User already exists", success: false})
    }
    const newUser = new User({firstName, lastName, mailId, country, role, about, projects, userRef: req.user.userId})
    await newUser.save()
    return res.status(200).json({message: "User Created Successfully", success: true})
  } catch (error) {
    console.log(error)
  }
}

// const updateUser =  async (req, res)=>{
//   try {
//    const id = req.params.id
//    const data = req.body
//    const response = await User.findByIdAndUpdate(id, data, {
//      runValidators: true,
//      new: true
//    })
//    res.status(200).json({message: "User updates successfully", success: true})
//   } catch (error) {
//    console.log(error)
//   }
//  }
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    // Fetch the existing user
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Make sure both old and new projects are arrays
    const oldProjects = Array.isArray(existingUser.projects) ? existingUser.projects : [];
    const incomingProjects = Array.isArray(newData.projects) ? newData.projects : [newData.projects];

    // Combine and deduplicate
    const combinedProjects = Array.from(new Set([...oldProjects, ...incomingProjects]));

    // Enforce max limit
    if (combinedProjects.length > 4) {
      return res.status(400).json({
        message: "Cannot assign more than 4 projects to a user.",
        success: false,
      });
    }

    // Set updated projects
    newData.projects = combinedProjects;

    const updatedUser = await User.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteUser = async (req, res)=>{
  try {
    const id = req.params.id
    const data = req.body
    const response = await User.findByIdAndDelete(id, data)
    res.status(200).json({message: "delete successfully"})
  } catch (error) {
    console.log(error)
  }
}

const getAllUser = async (req, res)=>{
  try {
    const userId = req.user.userId
    const user = await User.find({userRef: userId})
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {createUser, updateUser, deleteUser, getAllUser }