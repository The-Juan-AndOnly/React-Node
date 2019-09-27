// Course Model
const Course = require('../models/Course');
const User = require('../models/User');
// Express Validator
const { check, validationResult } = require('express-validator');

// Course Validation
// checking for Title and Description
exports.validate = method => {
  switch (method) {
    case 'addCourse': {
      return [
        check('title', 'Please include a Title')
          .not()
          .isEmpty(),
        check('description', 'Please include a Description')
          .not()
          .isEmpty()
      ];
    }
  }
};

// Get All Courses
// return the title,description,estimatedTime,matsNeeded
// also include id, firstName,lastName,and email Address of User
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'estimatedTime',
        'materialsNeeded'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        }
      ]
    });
    if (courses) {
      return res.status(200).json({ courses });
    } else {
      res.status(404).json({ errors: [{ err: 'no courses found!' }] });
    }
  } catch (err) {
    next(err);
  }
};

// Get Single Course
// return the id, title,description,estimatedTime,matsNeeded
// also include id, firstName,lastName,and email Address of User
exports.getSingleCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'title',
        'description',
        'estimatedTime',
        'materialsNeeded'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        }
      ]
    });
    if (course) {
      return res.status(200).json({ course });
    } else {
      return res.status(404).json({ errors: [{ msg: 'No Course Found' }] });
    }
  } catch (err) {
    next(err);
  }
};

// Add a Course
exports.addCourse = async (req, res, next) => {
  const { title, description, estimatedTime, materialsNeeded } = req.body;
  try {
    const errors = validationResult(req);
    console.log('Some errors');
    console.log(errors);
    console.log('End of error');
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // See if course exists
    const course = await Course.findOne({ where: { title } });
    if (course) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Course already exists' }] });
    }

    const user = req.currentUser;
    // Create new Course
    const newCourse = await Course.create({
      userId: user.id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    });
    // Return 201 and set Header to '/'
    res
      .status(201)
      .location('/')
      .end();
  } catch (err) {
    next(err);
  }
};

exports.editCourse = async (req, res, next) => {
  const { title, description, estimatedTime, materialsNeeded } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Grab Current Course
    const course = await Course.findOne({ where: { id: req.params.id } });
    // Check the course.userId === currentUser.id
    if (course.userId === req.currentUser.id) {
      const updatedCourse = await course.update({
        title,
        description,
        estimatedTime,
        materialsNeeded
      });
      return res.status(204).end();
    } else {
      return res.status(403).end();
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ where: { id: req.params.id } });
    if (course.userId === req.currentUser.id) {
      course.destroy();
      return res.status(204).end();
    } else {
      return res.status(403).end();
    }
  } catch (err) {
    next(err);
  }
};
