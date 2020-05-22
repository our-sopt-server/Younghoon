const pool = require('../modules/pool');
const encryption = require('../modules/encryption');
const table = 'user';

const users = {
    signup: async (id, name, password, salt, email) =>{
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const hashedPassword = await encryption.encrypt(password,salt);
        const values = [id, name, hashedPassword, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch{
            if(err.errno == 1062){
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR :', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    signin : async (id) =>{
        //1 hashed password 와 salt 가져오기
        const query = `SELECT password, salt FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('signin error: ', err);
            throw err;
        }
    },
    getUserById: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    }
}

module.exports = users;