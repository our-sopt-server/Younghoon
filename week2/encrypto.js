const crypto = require('crypto');

const encrypt = (salt, password) => {
    return new Promise((resolved, rejected )=>{
    crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', async (err, derivedKey) => {
            if (err) throw err;
            const hashed = derivedKey.toString('hex');
            console.log(hashed)
            resolved(hashed);
        });
    })
}


module.exports = encrypt;