const Project = require('../modals/Project')

const createProject = async (req, res) => {
  try {
    const { title, company, date, assignTo, about } = req.body;
    if (!title || !date || !company || !about) {
      return res.status(400).json({ message: "Details are required", success: false });
    }
    const assignArray = assignTo
      ? Array.isArray(assignTo)
        ? assignTo
        : [assignTo]
      : [];
    const newProject = new Project({
      title,
      company,
      date,
      assignTo: assignArray,
      about,
      userRef: req.user.userId
    });

    await newProject.save();
    return res.status(200).json({ message: "Project Created Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found', success: false });
    }
    if (newData.assignTo) {
      const newAssigns = Array.isArray(newData.assignTo) ? newData.assignTo : [newData.assignTo];
      const mergedAssignTo = Array.from(new Set([...existingProject.assignTo, ...newAssigns]));
      newData.assignTo = mergedAssignTo;
    }
    const updatedProject = await Project.findByIdAndUpdate(id, newData, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({ message: 'Task Updated successfully', success: true, data: updatedProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};


const deleteProject = async (req, res)=>{
  try {
    const id = req.params.id
    const data = req.body
    const response = await Project.findByIdAndDelete(id, data)
    res.status(200).json({message: "delete successfully"})
  } catch (error) {
    console.log(error)
  }
}

const getAllProjects = async (req, res)=>{
  try {
    const userId = req.user.userId
    const task = await Project.find({userRef: userId})
    res.status(200).json(task)
  } catch (error) {
    console.log(error)
  }
}


module.exports = {createProject, updateProject, deleteProject, getAllProjects}