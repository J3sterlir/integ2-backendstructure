const express = require('express')
const Controller = require('../controller/studentController');
const { validateStudent } = require('../validators/studentValidator');

const router = express.Router()

router.get('/', Controller.getAllStudents)

router.get('/:id', Controller.getStudentById)

router.post('/', validateStudent, Controller.createStudent)

router.delete('/:id', Controller.deleteStudent)

router.patch('/:id', validateStudent, Controller.updateStudent)

module.exports = router;