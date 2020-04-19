var group2 ={
    groupName:'파트장님 저희 이쁘조...?',
    members :[
        {name:"최영훈", nickname:"UXUI", age:26, status:'OB'},
        {name:"유가희", nickname:"한혜진", age:25, status:'OB'},
        {name:"김민지", nickname:"하니", age:24, status:'YB'},
        {name:"박우영", nickname:"초상화 그녀", age:24, status:'YB'},
        {name:"홍민정", nickname:"일산고양이", age:10, status:'YB'},
        {name:"선진", nickname:null, age:null, status:'YB'}
    ],
    printGroupName: function(){
        console.log('조 이름은 :', this.groupName);
    },
    printAllMember: function(){
        let str = "저희 조에는 "
        this.members.forEach((member) =>
            str += member.name+', '
        )
        str+=' 이(가) 있습니다.! '
        console.log(str);
    },
    addMember: function(name,nickname,age,status){
        const str = '{"name":"'+name+'", "nickname":"'+nickname+'", "age":'+age+', "status":"'+status+'"}';
        this.members.push(JSON.parse(str))
    }
}
console.log(group2);
group2.printGroupName();
group2.printAllMember();
group2.addMember('박경선',"서버요정",2,'파트장');
console.log(group2);