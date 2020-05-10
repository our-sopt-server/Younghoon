var express = require('express');
var router = express.Router();
const users = require('../model/users');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

// router.post('/signup', async (req,res) =>{
//   const {id, name, password, email} = req.body;

//   if(!id || !name || !password || !email){
//     return res.status(statusCode.BAD_REQUEST)
//     .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
//   }

//   if(users.filter(it => it.id ===id).length>0){
//     return  res.status(statusCode.BAD_REQUEST)
//     .send(util.fail(statusCode.BAD_REQUEST,resMessage.BAD_REQUEST));

//   }

//   users.push({id,name,password,email});
//   res.status(statusCode.OK)
//   .send(util.success(statusCode.OK,resMessage.CREATED_USER,users[users.length -1].id));
// });

router.post('/signin', async(req,res) =>{
  const {id, password} = req.body;

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

module.exports = router;
