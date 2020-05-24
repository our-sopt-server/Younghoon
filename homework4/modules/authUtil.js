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