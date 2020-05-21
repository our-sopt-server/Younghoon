var express = require('express');
var router = express.Router({mergeParams:true});
const encryption = require('../modules/encryption');
const users = require('../model/users');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

router.post('/signup', async (req,res) =>{
  const {id, name, password, email} = req.body;

  if(!id || !name || !password || !email){
    return res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
  }

  if(users.checkUser(user)){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.ALREADY_ID));
    return;
  }

  const salt = '1234q5asfs23413';

  const idx = await users.signup(id,name,password,salt,email);

  res.status(statusCode.OK)
  .send(util.success(statusCode.OK,resMessage.CREATED_USER,users[users.length -1].id));
});

router.post('/signin', async(req,res) =>{
  const {id, password} = req.body;
  console.log(id)

  if(!id || !password){
    return res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
  }
  // id 확인
  const user = users.filter(user=> user.id === id);
  if(user.length == 0){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    return;
  }

  //비밀번호 체크
  if(user[0].password != password){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
    return;
  }

  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,user));  
})

router.get('/', function(req, res, next) {
  res.send('user페이지');
});

router.get('/profile/:id', async (req,res)=>{
  //request params에서 데이터 가져오기
  const {id} = req.params;
  //존재하는 아이디인지 확인 - 없다면 No user
  const user = users.filter(it => it.id === id);
  if(user.length==0){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    return;
  }
  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,user[0].id));
})

module.exports = router;
