const func1 = (param) => {
    return new Promise((resolved, rejected)=>{
        setTimeout(()=>{
            console.log('func1 return resolved');
            resolved('func 1 success:'+param+'\n');
        },500);
    });
}

const func2 = (param)=>{
    return new Promise((resolved, rejected)=>{
        setTimeout(()=>{
            console.log('func2 return rejected');
            rejected(new Error('func 2 error:'+param+'\n'))
        },500)
    })
}
const func3 = (param) => {
    return new Promise((resolved, rejected)=>{
        setTimeout(()=>{
            console.log('func3 return resolved');
            resolved('func3 success:'+param+'\n');
        },500);
    });
}

const func4 = (param)=>{
    return new Promise((resolved, rejected)=>{
        setTimeout(()=>{
            console.log('func4 return rejected');
            rejected(new Error('func 4 error:'+param+'\n'))
        },500)
    })
}
const func5 = (param) => {
    return new Promise((resolved, rejected)=>{
        setTimeout(()=>{
            console.log('func5 return resolved');
            resolved('func 5 success:'+param+'\n');
        },500);
    });
}

const promise = func1('sopt')

promise
    .then((result) => func2(result))
    .then((result) => func3(result)) // rej func 2 error : func1 uccess ...
    .catch((result) => console.error(result))
    .then((result) => func4(result))// undefined
    .then((result)=> func5(result)) // rej func 4 error undefined
    .catch((result) => console.error(result))
    .then((result) => console.log(result));
    