var express = require('express');
var router = express.Router();
const postController = require('../controller/postController');

router.post('/create', postController.createPosting);
router.get('/readOne/:postIdx', postController.readOnePosting);
router.get('/readAll', postController.readAllPosting);
router.put('/update', postController.updatePost);
router.delete('/delete', postController.deletePost);
module.exports =router;