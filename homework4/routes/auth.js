const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

router.get('/local', async (req,res)=>{
    const token =req.headers.token;
    if(!token){
        return res.json(util.fail(statusCode.BAD_REQUEST,resMessage.EMPTY_TOKEN));
    }
    const user = await jwt.verify(token);
    if(user === TOKEN_EXPIRED){
        return res.json(util.fail(statusCode.UNAUTHORIZED,resMessage.EXPIRED_TOKEN));
    }
    if(user === TOKEN_INVALID){
        return res.json(util.fail(statusCode.UNAUTHORIZED,resMessage.INVALID_TOKEN));
    }
    if(user === undefined){
        return res.json(util.fail(statusCode.UNAUTHORIZED,resMessage.INVALID_TOKEN));
    }
    return res.json(util.success(statusCode.OK,resMessage.AUTH_SUCCESS));
})
module.exports = router;