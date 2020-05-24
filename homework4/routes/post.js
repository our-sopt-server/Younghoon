var express = require('express');
var router = express.Router();
const postController = require('../controller/postController');
const authUtil = require('../modules/authUtil');

router.post('/create',authUtil.LoggedIn, postController.createPosting);
router.get('/readOne/:postIdx', postController.readOnePosting);
router.get('/readAll', postController.readAllPosting);
router.put('/update', authUtil.LoggedIn, postController.updatePost);
router.delete('/delete', authUtil.LoggedIn, postController.deletePost);
module.exports =router;
