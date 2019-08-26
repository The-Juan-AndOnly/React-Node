const router = require('express').Router();
// Import product controller
const courseController = require('../controllers/course');
const auth = require('../controllers/auth');

// @route GET api/courses
// @desc Returns a list of courses including user that owns each course
// @access Public
router.get('/', courseController.getCourses);

// @route GET api/courses
// @desc Returns a course including user that owns each course for the provided ID of course
// @access Public
router.get('/:id', courseController.getSingleCourse);

// @route POST api/courses
// @desc Create a new course
// @access Protected
router.post(
  '/',
  auth,
  courseController.validate('addCourse'),
  courseController.addCourse
);

// @route PUT api/courses
// @desc Create Updates a Course
// @access Protected
router.put(
  '/:id',
  auth,
  courseController.validate('addCourse'),
  courseController.editCourse
);

// @route DELETE api/courses
// @desc Deletes a course
// @access Protected
router.delete(
  '/:id',
  auth,
  courseController.validate('addCourse'),
  courseController.deleteCourse
);

module.exports = router;
