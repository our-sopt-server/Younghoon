const pool = require('../modules/pool');
const table = 'post';

/* postIdx(AI,PK), userIdx(FK) title, content*/ 
const posts ={
    createPost : async (writerIdx, title, content, createdAt) =>{
        const fields = `writerIdx, title, content, createdAt`;
        const question = `?,?,?,?`;
        const values = [writerIdx, title, content, createdAt]
        const query = `INSERT INTO ${table}(${fields}) VALUES(${question})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        }catch(err){
            if(err.errno == 1062){
                console.log('Create posting ERROR:', err.errno,err.code);
                return -1;
            }
            console.log('create posting ERROR:', err);
            throw err;
        }
    },
    readOnePost : async(postIdx) =>{
        const query = `SELECT * FROM ${table} WHERE postIdx ="${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('readOnePost ERROR :'+ err);
            throw err;
        }
    },
    readAllPost : async() =>{
        const query =`SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err) {
            console.log('readAllPost ERROR :'+ err);
            throw err;
        }
    },
    updatePost : async (postIdx, title, content) => {
        const query = `UPDATE ${table} SET title ="${title}", content = "${content}" WHERE postIdx ="${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('updatePost ERROR :'+ err);
            throw err;
        }
    },
    isMyPostIdx : async (writerIdx, postIdx) =>{
        const query = `SELECT * FROM ${table} WHERE writerIdx ="${writerIdx}" and postIdx = "${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return false;
            }else return true;
        } catch(err) {
            console.log('isMyPostIdx ERROR :'+ err);
            throw err;
        }
    },
    deletePost : async(postIdx) =>{
        const query = `DELETE FROM ${table} WHERE postIdx = "${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('deletePost ERROR'+ err);
            throw err;
        }
    }
}

module.exports = posts;