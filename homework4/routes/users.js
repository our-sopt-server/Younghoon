var express = require('express');
var router = express.Router();
const encryption = require('../modules/encryption');
const users = require('../models/users');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

router.post('/signup', async (req,res) =>{
  const {id, name, password, email} = req.body;

  if(!id || !name || !password || !email){
    return res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
  }
  if(await users.checkUser(id)){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.ALREADY_ID));
    return;
  }

  const salt = encryption.salt();
  const idx = await users.signup(id,name,password,salt,email);
  if(idx === -1){
    return res.status(statusCode.DB_ERROR)
    .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }

  res.status(statusCode.OK)
  .send(util.success(statusCode.OK,resMessage.CREATED_USER,{userId:id}));
});

router.post('/signin', async(req,res) =>{
  const {id, password} = req.body;

  if(!id || !password){
    return res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
  }
  // id 체크 확인
  const idCheck = await users.checkUser(id);
  if(!idCheck){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    return;
  }
  //로그인 로직
  const result = await users.signin(id);
  const DBPassword = result[0].password;
  const DBSalt = result[0].salt;
  const hashedPassword = await encryption.encrypt(password,DBSalt);

  if(DBPassword !== hashedPassword){
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
  }

  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS, id));  
})

router.get('/', function(req, res, next) {
  res.send('user페이지');
});

router.post('/getUserById', async (req,res)=>{
  //request params에서 데이터 가져오기
  const {id} = req.body;
  //존재하는 아이디인지 확인 - 없다면 No user
  const idCheck = await users.checkUser(id);
  if(!idCheck){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    return;
  }
  const result = await users.getUserById(id);
  const user = {"id":result[0].id, "name":result[0].name, "email":result[0].email};
  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_PROFILE_SUCCESS,user));
})

module.exports = router;
