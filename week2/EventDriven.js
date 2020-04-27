function greet (){
 console.log('hello');
}

function timer(){
    return setTimeout(()=>{
        console.log('hi')
    }, 3000)
}

timer();
greet();