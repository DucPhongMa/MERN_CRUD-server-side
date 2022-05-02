const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController')


router.get('/index', userController.index);

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.delete('/:id', userController.remove);






module.exports = router;