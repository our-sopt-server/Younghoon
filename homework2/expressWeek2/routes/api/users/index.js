var express = require('express');
var router = express.Router();

router.use('/',require('./users'));
router.use('/login',require('./login'));
router.use('/signup',require('./signup'));

module.exports = router;
