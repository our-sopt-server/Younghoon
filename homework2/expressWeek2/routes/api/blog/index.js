var express = require('express');
var router = express.Router();

router.use('/',require('./blog'));
router.use('/post',require('./post'));

module.exports = router;
