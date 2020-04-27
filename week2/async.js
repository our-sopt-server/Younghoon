let asyncFunc1 = (msg) =>
    new Promise((resolve) =>{
        setTimeout(()=>{
            resolve(`func1: ${msg}`)
        }, 1000)
    })

let asyncFunc2 = (msg) =>
    new Promise((resolve)=> {
        setTimeout(()=>{
            resolve(`func2 : ${msg}`)
        },1000)
    })

function promiseMain (){
    asyncFunc1('Hello').then((result) =>{
        console.log(result)
        return asyncFunc2('world')
    }).then((result)=>{
        console.log(result)
    })
}

async function asyncMain () {
    let result = await asyncFunc1('async main Hello')
    console.log(result);
    result = await asyncFunc2('async main world')
    console.log(result)
}

//promiseMain()
asyncMain()