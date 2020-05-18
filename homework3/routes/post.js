var express = require('express');
var router = express.Router({mergeParams:true});
const posts = require('../model/posts');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

//게시글 작성하기.
router.post('/', async (req,res)=>{
    const{author, title, content} = req.body;
    console.log(author)
    if(!author || !title || !content){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }
    const postIdx = posts.length;
    posts.push({postIdx,author,title,content});

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.CREATED_POST,posts[posts.length-1]));

})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    //nulll 값 확인하기.

    if(!id){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }

    const post = posts.filter(it=>it.postIdx === id);

    if(Object.keys(post).length==0){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST_IDX));
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.READ_POST,post));
})

module.exports = router;