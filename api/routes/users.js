const router = require('express').Router();
// Import product controller
const userController = require('../controllers/user');
const auth = require('../controllers/auth');

// @route GET api/users
// @desc GET Users
// @access Protected
router.get('/', auth, userController.getUsers);

// @route POST api/users
// @desc POST Users
// @access Public
router.post('/', userController.validate('addUser'), userController.addUser);

module.exports = router;
