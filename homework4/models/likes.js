const pool = require('../modules/pool');
const table = 'like';
/* likeIdx, postIdx, userIdx 
    get Like -> 해당 게시글 좋아요 수 반환 
    delete Like -> 좋아요 삭제
    insertLike -> 좋아요 추가
    viewLike -> 내가 해당 게시글에 좋아요 했는지 보기
*/
const likes= {
    insertLike : async(postIdx, userIdx) =>{
        const fields = `postIdx, userIdx`;
        const question = `?,?`;
        const values = [postIdx, userIdx];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${question})`;
        try{
            const result = await pool.queryParamArr(query,values);
            return result;
        }catch(err){
            console.log('insertLike ERROr'+err);
            throw err;
        }
    },
    getLike : async(postIdx) =>{
        const query = `SELECT COUNT(*) FROM ${table} WHERE postIdx = "${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getLike ERROR' + err)
            throw err;
        }
    },
    viewLike : async(postIdx, userIdx) =>{
        const query = `SELECT *  FROM ${table} WHERE postIdx = "${postIdx}" and userIdx ="${userIdx}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length ===0){
                return false;
            } else return true;
        }catch(err){
            console.log('ViewLike ERROR :' + err);
            throw err;
        }
    },
    deleteLike : async(postIdx, userIdx) =>{
        const query = `DELETE FROM ${table} WHERE postIdx = "${postIdx}" and userIdx = "${userIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('deleteLike ERROR'+ err);
            throw err;
        }
    }
}

module.exports = likes;