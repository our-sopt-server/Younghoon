let isMomHappy = true;
let phone = {
    brand:'samsung',
    color:'black'
}

var willIGetNewPhone = new Promise ((resolve, reject)=>{
    if(isMomHappy){
        resolve(phone)
    }else{
        reject(new Error('mom is not happy'))
    }
})
