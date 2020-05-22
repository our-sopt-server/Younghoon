var express = require('express');
var router = express.Router();
let posts = require('../model/posts');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
/*
{
    postIdx:"0",
    author:" 글쓴이 ",
    title:" 제목 ",
    content:"내용 "
}
*/
router.post('/', async (req,res)=>{
    const{author, title, content} = req.body;

    if(!author || !title || !content){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }
    // 포스트 지우고 다시 포스팅하면  포스트 아이디 겹치는거 확인좀
    const postIdx = posts.length.toString();
    posts.push({postIdx,author,title,content});

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.CREATED_POST,posts[posts.length-1]));
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;

    if(!id){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }

    const post = posts.filter(it=>it.postIdx === id);
    if(Object.keys(post).length===0){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST_IDX));
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.READ_POST,post));
})

router.get('/', async (req,res)=>{
    //전체 조회
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.READ_POST,posts));
})

router.delete('/:id', async (req,res) =>{
    const {id} =req.params;

    //null value check
    if(!id){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }

    // 유효하지 않은 id값
    const findPostIdx = posts.findIndex(it => it.postIdx === id);
    if(findPostIdx === -1){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST_IDX));
        return
    }

    // id 값 제거
    const post = posts.filter(it => it.postIdx !== id);
    posts = post;
    console.log(posts);
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST,posts))
})

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const {author, title, content} = req.body; 

    //null value check
    if(!id || !title || !content || !author){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }

    // 유효하지 않은 id값
    const findPostIdx = posts.findIndex(it => it.postIdx === id);
    if(findPostIdx === -1){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST_IDX));
        return;
    }    

    const postIdx = id;
    posts[findPostIdx] = {postIdx, author, title, content};
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_POST,posts[findPostIdx]))
})
module.exports = router;