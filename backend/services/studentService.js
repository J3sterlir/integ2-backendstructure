const Student = require('../models/student');

const studentService = {
  // Create to db
  createStudent: async (studentData) => {
    try {
      // Check db if email exist
      const existingStudent = await Student.findOne({ email: studentData.email });
      if (existingStudent) {
        throw new Error('Student with this email already exists');
      }

      const student = new Student(studentData);
      return await student.save();
    } catch (error) {
      throw error;
    }
  },

  // Update to db
  updateStudent: async (id, updateData) => {
    try {
      // Check db email if updated, check for dupes
      if (updateData.email) {
        const existingStudent = await Student.findOne({ 
          email: updateData.email, 
          _id: { $ne: id } 
        });
        if (existingStudent) {
          throw new Error('Another student with this email already exists');
        }
      }

      const student = await Student.findOneAndUpdate(
        { _id: id }, 
        { ...updateData },
        { new: true, runValidators: true } // Return updated and validate
      );

      if (!student) {
        throw new Error('Student not found');
      }

      return student;
    } catch (error) {
      throw error;
    }
  },

  // Delete data from db
  deleteStudent: async (id) => {
    try {
      const student = await Student.findOneAndDelete({ _id: id });
      
      if (!student) {
        throw new Error('Student not found');
      }
      
      return student;
    } catch (error) {
      throw error;
    }
  },

  // Get all data from db
  getAllStudents: async () => {
    try {
      const students = await Student.find({}).sort({ createdAt: -1 });
      return students;
    } catch (error) {
      throw error;
    }
  },

  // Get single student by id in db
  getStudentById: async (id) => {
    try {
      const student = await Student.findById(id);
      
      if (!student) {
        throw new Error('Student not found');
      }
      
      return student;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = studentService;