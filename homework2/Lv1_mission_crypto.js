const cryptoModule = require('../../week2/encrypto');
const fs = require('fs');

async function result(){
    const salt = 'salt';
    const data =fs.readFileSync(`password.txt`);
    const hashed = await cryptoModule(salt,data);
    fs.writeFileSync(`hash.txt`,hashed);
}
result();


