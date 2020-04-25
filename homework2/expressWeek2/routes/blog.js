var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    const result = {
        status:200,
        message:'success'
    }
    res(result.status).send(result.message);
});

module.exports = router;
