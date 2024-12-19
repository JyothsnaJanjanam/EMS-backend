const User = require('../models/authModel')
const Employee = require('../models/employeeModel')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Department = require('../models/departmentModel') 

// Ensure upload directory exists
const uploadPath = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage and file validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({ storage: storage })

// const addEmployee = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       employeeId,
//       dob,
//       gender,
//       maritalStatus,
//       designation,
//       department,
//       salary,
//       password,
//       role,
//     } = req.body;

//     const user = await User.findOne({ email })
//     if (user) {
//       return res.status(400).json({ success: false, message: 'User already registered in emp' })
//     }

//     const hashPassword = await bcrypt.hash(password, 10)

//     const newUser = new User({
//       name,
//       email,
//       password: hashPassword,
//       role,
//       profileImage: req.file ? req.file.filename : ''
//     })
//     const savedUser = await newUser.save()

//     const newEmployee = new Employee({
//       userId: savedUser._id,
//       employeeId,
//       dob,
//       gender,
//       maritalStatus,
//       designation,
//       department,
//       salary
//     })

//     await newEmployee.save()
//     return res.status(200).json({success: true, message: 'employee created'})
//   } catch(error) {
//     console.log(error.message)
//     return res.status(500).json({success: false, message: 'server error in adding employee'})
//   }
// }

const addEmployee = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already registered' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? `/uploads/${req.file.filename}` : '',
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(200).json({ success: true, message: 'Employee created' });
  } catch (error) {
    console.error('Error in addEmployee:', error.message);
    return res.status(500).json({ success: false, message: 'Server error in adding employee' });
  }
};


const getEmployees = async (req, res) => {
  try {
      const employees = await Employee.find().populate('userId', {password: 0}).populate('department')
      return res.status(200).json({success: true, employees})
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({success: false, message: 'get employees server error'})
    }
}

const getSingleEmployee = async (req, res) => {
  const {id} = req.params;
  try {
    let employee;
    employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate('department')
    if(!employee) {
      employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate('department')
    }
    return res.status(200).json({success: true, employee})
  } catch (error) {
    return res.status(500).json({success: false, message: 'get single employee server error'})
  }
}

const updateEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      role
    } = req.body;

    const employee = await Employee.findById({_id: id})

    // .populate('department', 'dep_name description').populate('userId', 'name email');
    
    if(!employee) {
      return res.status(404).json({success: false, message: 'employee not found'})
    }

    const user = await User.findById({_id: employee.userId})
    if(!user) {
      return res.status(404).json({success: false, message: 'user not found'})
    }


    const updateUser = await User.findByIdAndUpdate({_id: employee.userId})
    const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
      employeeId,
      dob, 
      gender, 
      maritalStatus, 
      designation, 
      department,
      //  : employee.department.dep_name,
      salary, 
      role: employee.userId.role 
    })

    if(!updateEmployee || !updateUser) {
      return res.status(404).json({success: false, message: 'document not found'})
    }

    return res.status(200).json({success: true, message: 'employee updated'})

  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'update employee server error'})
  }
}

const fetchEmployeesByDepId = async (req, res) => {
  const {id} = req.params;
  try {
    const employees = await Employee.find({department: id})
    return res.status(200).json({success: true, employees})
  } catch (error) {
    return res.status(500).json({success: false, message: 'getEmployeesByDepId server error'})
  }
}

module.exports = { 
  addEmployee, upload, 
  getEmployees, 
  getSingleEmployee,
  updateEmployee,
  fetchEmployeesByDepId
}
