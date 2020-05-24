const encryption = require('../modules/encryption');
const users = require('../models/users');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const jwt = require('../modules/jwt')

module.exports = {
    signup: async (req, res) => {
        const {
            id,
            name,
            password,
            email
        } = req.body;
        if (!id || !name || !password || !email) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        const idCheck = await users.checkUser(id);
        if (idCheck) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        }

        const salt = await encryption.salt();
        const idx = await users.signup(id, name, password, salt, email);
        if (idx === -1) {
            return await res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        return await res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, {
            userId: id
        }));
    },
    signin: async (req, res) => {
        //로그인에 대한 로직
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            return await res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        // id 체크 확인
        const idCheck = await users.checkUser(id);
        if (!idCheck) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        }

        //로그인 로직
        //result가 user를 받아온 결과
        const result = await users.signin(id);
        const DBPassword = result[0].password;
        const DBSalt = result[0].salt;
        const hashedPassword = await encryption.encrypt(password, DBSalt);

        if (DBPassword !== hashedPassword) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        }
        const {token, _} = await jwt.sign(result[0])
        await res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, 
            {accessToken:token}));
    },
    getUserById: async (req, res) => {
        //유저 조회하기 (유저 이메일, 이름 등등...)
        const {
            id
        } = req.body;
        console.log(id)

        //존재하는 아이디인지 확인 - 없다면 No user
        const idCheck = await users.checkUser(id);
        if (!idCheck) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        }
        const result = await users.getUserById(id);
        const user = {
            "id": result[0].id,
            "name": result[0].name,
            "email": result[0].email
        };
        return await res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, user));
    }
}