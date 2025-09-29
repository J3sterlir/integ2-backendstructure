const studentService = require('../services/studentService');

const studentController = {
  // Create student from  req form
  createStudent: async (req, res) => {
    try {
      const { name, email, age } = req.body;

      // Validate fields in req form
      if (!name || !email) {
        return res.status(400).json({
          message: 'Name and email are required fields'
        });
      }

      const studentData = { name, email, age };
      const newStudent = await studentService.createStudent(studentData);

      res.status(201).json({
        message: 'Student created successfully',
        data: newStudent
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  },

  // Update student based on req form
  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedStudent = await studentService.updateStudent(id, updateData);

      res.status(200).json({
        message: 'Student updated successfully',
        data: updatedStudent
      });
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        message: error.message
      });
    }
  },

  // Delete student based on req form
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedStudent = await studentService.deleteStudent(id);

      res.status(200).json({
        message: 'Student deleted successfully',
        data: deletedStudent
      });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  },

  // Get all students req
  getAllStudents: async (req, res) => {
    try {
      const students = await studentService.getAllStudents();

      res.status(200).json({
        count: students.length,
        data: students
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  },

  // Get student by ID req
  getStudentById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const student = await studentService.getStudentById(id);

      res.status(200).json({
        success: true,
        data: student
      });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }
};

module.exports = studentController;


/*
const Student = require('../models/student')
const mongoose = require('mongoose')

//get all
const getStudents = async (req,res) => {
    const students = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
}

//get single
const getStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such student exists'})
    }

    const student = await Student.findById(id)

    if (!student){
        return res.status(404).json({error: 'No such student exists'})
    }

    res.status(200).json(student)
}

//create
const createstudent = async (req, res) => {
    const{Name, Email, Age} = req.body

    try {
        const student = await Student.create({Name, Email, Age})
        res.status(200).json(student)
    }   catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete
const deleteStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such student exists'})
    }

    const student = await Student.findOneAndDelete({ _id: id })

    if (!student){
        return res.status(404).json({error: 'No such student exists'})
    }

    res.status(200).json(student)
}

//update
const updateStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student exists'})
    }

    const student = await Student.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!student){
        return res.status(404).json({error: 'No such student exists'})
    }

    res.status(200).json(student)
}

module.exports = {
    getStudent,
    getStudents,
    createstudent,
    deleteStudent,
    updateStudent
}
*/