const Leave = require('../models/leave.js')
const Employee = require('../models/employeeModel.js')

const addLeave = async (req, res) => {
  try {
      const { userId, leaveType, startDate, endDate, reason } = req.body
      const employee  = await Employee.findOne({userId})
  
      const newLeave = new Leave({ employeeId: employee._id, leaveType, startDate, endDate, reason })
  
      await newLeave.save()
      return res.status(200).json({success: true})
  
    } catch (error) {
      // console.log(error)
      return res.status(500).json({success: false, message: 'add leave server error'})
    }
}

const getSingleLeave = async (req, res) => {
  try {
    const {id, role} = req.params;  

    let leaves;
    if (role === 'admin') {
      console.log(id)
      leaves = await Leave.find({employeeId: id})
      console.log(leaves)
    } else {
      const employee = await Employee.findOne({userId: id})
      leaves = await Leave.find({employeeId: employee._id})
    }
    return res.status(200).json({success: true, leaves})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success: false, message: 'get leaves server error'})
  }
}

const getLeaves = async (req, res) => {
  try{
    const leaves = await Leave.find().populate({
      path: 'employeeId',
      populate: [
        { path: 'department', select: 'dep_name' }, 
        { path: 'userId', select: 'name' }
      ]
    })
    return res.status(200).json({success: true, leaves})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'get leaves server error'})
  }
}

const getLeaveDetails = async (req, res) => {
  try{
    const {id} = req.params
    const leave = await Leave.findById({_id: id}).populate({
      path: 'employeeId',
      populate: [
        { path: 'department', select: 'dep_name' }, 
        { path: 'userId', select: 'name profileImage' }
      ]
    })
    return res.status(200).json({success: true, leave})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'get leaves deatils server error'})
  }
}

const updateLeave = async(req, res) => {
  try {
    const {id} = req.params
    const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
    if(!leave) {
      return res.status(404).json({success: false, message: 'leave not found'})
    }
    return res.status(200).json({success: true})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'update leaves server error'})
  }
}

module.exports = {
  addLeave,
  getSingleLeave,
  getLeaves,
  getLeaveDetails,
  updateLeave
}