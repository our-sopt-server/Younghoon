//1. json 객체 실습

var sopt = {
    name: 'OUR SOPT',
    slogan: 'WE LEAD OUR SOPT',
    part: ['placn', 'design', 'android','iOS', 'server'],
    number : 180,
    printName: function() {
        console.log('name:', this.name)
    },
    printNum : function() {
        console.log('number :', this.number)
    }
};

console.log('type sopt: ' + typeof sopt);

//+ 와 , 의 차이
console.log('+ sopt :'+sopt);
console.log(', sopt : ',sopt);
console.log('sopt :' +JSON.stringify(sopt));

sopt.printName();
sopt.number = 190;
sopt.printNum();

var dogs= [
    {name : '식빵', family: '웰시코기', age:1, weight:2.14},
    {name : '콩콩', family: '포메라니안', age: 3, weight:2.5},
    {name : '두팥', family: '푸들', age:7, weight:3.1}
];

console.log('+dogs : '+ dogs);
console.log(',dog : ', dogs);
console.log('dogs: ',JSON.stringify(dogs));

dogs.forEach(
    item=>console.log(item.name+'이는 종이'+item.family+'이고 , 나이가 '+item.age+' 세입니다.')
);