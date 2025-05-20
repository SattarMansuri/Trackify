const Task = require('../modals/Task')

const createTask = async (req, res)=>{
  try {
    const {title, date, status, about } = req.body
    if(!title || !date || !status || !about){
    return res.status(400).json({message: "Details with star marks are required", success: false})
    }
    const newTask = new Task({title, date, status, about, userRef: req.user.userId})
    await newTask.save()
    return res.status(200).json({message: "Task Created Successfully", success: true})
  } catch (error) {
    console.log(error)
  }
}

const getTaskById = async (req, res)=>{
  try {
    const id = req.params.id
    const response = await Task.findById(id)
    res.status(200).json(response)
  } catch (error) {
   console.log(error)
  }
}

const updateTask =  async (req, res)=>{
  try {
   const id = req.params.id
   const data = req.body
   const response = await Task.findByIdAndUpdate(id, data, {
     runValidators: true,
     new: true
   })
   res.status(200).json({message: 'Task updated successfully', success: true})
  } catch (error) {
   console.log(error)
  }
 }

const deleteTask = async (req, res)=>{
  try {
    const id = req.params.id
    const data = req.body
    const response = await Task.findByIdAndDelete(id, data)
    res.status(200).json({message: "delete successfully"})
  } catch (error) {
    console.log(error)
  }
}

const getAllTasks = async (req, res)=>{
  try {
    const userId = req.user.userId
    const task = await Task.find({userRef: userId})
    res.status(200).json(task)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {createTask, getTaskById, updateTask, deleteTask, getAllTasks}