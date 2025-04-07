const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');

router.post('/register',userController.createUser)
router.post('/check_signup_email',userController.getByMail)
router.post('/login',userController.getUserByMailPassword)
router.get('/profile/:id',userController.getUserById)

module.exports  = router