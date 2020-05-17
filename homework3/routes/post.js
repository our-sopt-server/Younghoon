var express = require('express');
var router = express.Router({mergeParams:true});
const posts = require('../model/posts');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

//게시글 작성하기.
router.post('/', async (req,res)=>{
    const{author, title, content} = req.body;

    if(!author || !title || !content){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }

    posts.push(posts.length,author,title,content);

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.CREATED_POST,posts[length-1]));

})

module.exports = router;