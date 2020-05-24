# LEVEL3

### 미들웨어 적용하기

#### /modules/authUtil.js
토큰인증 미들웨어

```javaScript
const util = require('./util');
const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const jwt = require('./jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    LoggedIn: async (req, res, next) => {
        const token = req.headers.token;
        if (!token) {
            return res.json(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        }
        const user = await jwt.verify(token);
        if (user === TOKEN_EXPIRED) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }
        if (user === TOKEN_INVALID) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
        if (user === undefined) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
        req.userIdx = user.idx;
        next();
    }
}
```

#### /routes/post.js
라우터에 미들웨어를 적용한모습

``` javaScript
var express = require('express');
var router = express.Router();
const postController = require('../controller/postController');
const authUtil = require('../modules/authUtil');

router.post('/create',authUtil.LoggedIn, postController.createPosting);
router.get('/readOne/:postIdx', postController.readOnePosting);
router.get('/readAll', postController.readAllPosting);
router.put('/update', authUtil.LoggedIn, postController.updatePost);
router.delete('/delete', authUtil.LoggedIn, postController.deletePost);
module.exports =router;
```

자세한 코드는 [여기에](https://github.com/our-sopt-server/Younghoon/tree/master/homework4) 있습니다.

### API TEST

#### 로그

<img src="https://github.com/our-sopt-server/Younghoon/blob/master/homework5/img/로그.png?raw=true" width="600px" />



#### 토큰설정

<img src="https://github.com/our-sopt-server/Younghoon/blob/master/homework5/img/post%20token.png?raw=true" width="600px" />



#### CREATE 포스트

<img src="https://github.com/our-sopt-server/Younghoon/blob/master/homework5/img/create.png?raw=true" width="400px" />



#### READ_ALL 포스트

<img src="https://github.com/our-sopt-server/Younghoon/blob/master/homework5/img/readAll.png?raw=true" width="400px" />



#### READ_ONE 포스트

<img src="https://github.com/our-sopt-server/Younghoon/blob/master/homework5/img/readONe.png?raw=true" width="400px" />



#### UPDATE 포스트

<img src="https://github.com/our-sopt-server/Younghoon/blob/master/homework5/img/update성공.png?raw=true" width="400px" />



#### DELETE 포스트

<img src="https://github.com/our-sopt-server/Younghoon/blob/master/homework5/img/삭제.png?raw=true" width="400px" />



