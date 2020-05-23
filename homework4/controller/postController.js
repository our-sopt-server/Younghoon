const posts = require('../models/posts');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const moment = require('moment');

module.exports = {
    createPosting : async (req, res) => {
        //Authorization 받아왔다 치고
        const writerIdx = 8; // USER table 로부터 참조한 FK 
        const {title, content} = req.body;
        const createdAt = moment().format('MM/DD/YYYY HH:mm:ss');
        
        if(!writerIdx || !title || !content){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        const newPostIdx = await posts.createPost(writerIdx, title, content, createdAt);
        if(newPostIdx === -1){
            return await res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATED_POST,{"postIdx":newPostIdx}));
    },
    readOnePosting : async (req,res) =>{
        const postIdx = req.params.postIdx;

        if(!postIdx){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        const postData = await posts.readOnePost(postIdx);
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_POST,postData));
    },
    readAllPosting : async (req,res) =>{
        const postData = await posts.readAllPost();
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_ALL_POST,postData));
    },
    updatePost : async (req,res) =>{
        //authorization 에서 받아온 값
        const  writerIdx = 7;
        const {postIdx, title, content} = req.body;
        if(!writerIdx || !postIdx || !title || !content){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        // 내가쓴 글이 아니라면 수정 불가
        const isMyPost = await posts.isMyPostIdx(writerIdx,postIdx);
        if(!isMyPost){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.PERMISSION_DENIED_UPDATE_POST));
        }
        const result = await posts.updatePost(postIdx,title,content)
        if(result.affectedRows !==1){
            return await res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR,resMessage.UPDATE_FAIL));
        }
        const updatePost = await posts.readOnePost(postIdx);
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_POST,
            {
                title:updatePost[0].title,
                content:updatePost[0].content
            }));
    },
    deletePost : async (req,res)=>{
        //auth~
        const writerIdx = 8;
        const {postIdx} = req.body;
        if(!postIdx){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        //포스트 존재 여부 확인
        const isPost = await posts.readOnePost(postIdx);
        if(isPost[0] === undefined){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST_IDX));
        }

        // 내가쓴 글이 아니라면 수정 불가
        const isMyPost = await posts.isMyPostIdx(writerIdx,postIdx);
        if(!isMyPost){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.PERMISSION_DENIED_DELETE_POST));
        }

        const result = await posts.deletePost(postIdx);
        if(result.affectedRows !==1){
            return await res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR,resMessage.DELETE_FAIL));
        }
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST,{deletePostIdx:postIdx}));
    }
}