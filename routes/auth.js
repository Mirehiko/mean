const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');


router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', controller.logout);


module.exports = router;
