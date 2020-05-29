const likes = require('../models/likes');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

module.exports = {
    toggleLike : async (req,res)=>{
        const userIdx = req.userIdx;
        const postIdx = req.params;
        if(!userIdx || !postIdx){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        }
        const likeToggle = await likes.viewLike(postIdx,userIdx);
        if(likeToggle){
            //delete
            const result = await likes.deleteLike(postIdx,userIdx);
            return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_LIKE,result));
        }else{
            //create
            const result = await likes.insertLike(postIdx,userIdx);
            return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.ADD_LIKE,result));
        }
    },
    

}