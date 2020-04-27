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
    printAllMember: ()=>{
        let str = "저희 조에는 "
        this.members.forEach((member) =>
            str += member.name+', '
        )
        str+=' 이(가) 있습니다.! '
        console.log(str);
    },
    addMember: function(name,nickname,age,status){
        const str = '{"name":"'+name+'", "nickname":"'+nickname+'", "age":'+age+', "status":"'+status+'"}';
        const newMemberObj = JSON.parse(str)
        this.members.push(newMemberObj)
        console.log('멤버 생성 완료!',newMemberObj)
    },
    deleteMember: function(name){
        const idx = this.findMemberIndex(name);
        if(idx > -1){
            console.log('멤버 삭제 완료', this.members[idx])
            this.members.splice(idx,1);   
        }
    },
    updateMember: function(name, nickname, age, status){
        const idx = this.findMemberIndex(name);
        if(idx > -1){
            const str = '{"name":"'+name+'", "nickname":"'+nickname+'", "age":'+age+', "status":"'+status+'"}';
            this.members[idx] = JSON.parse(str);
            console.log('업데이트 완료!', this.members[idx]);
        }
    },
    findMemberIndex: function(name){
        const nameToFind = this.members.find(function(item){
            return item.name === name;
        })
        const idx = this.members.indexOf(nameToFind)
        return idx;
    }
}
console.log(group2);
console.log('-----Create------')
group2.addMember('박경선',"서버요정",2,'OB');

console.log('-----Read------')
group2.printGroupName();
group2.printAllMember();

console.log('-----Update------')
group2.updateMember('박경선',"서버파트장",23,"서버 파트장")

console.log('-----Delete------')
group2.deleteMember('최영훈');
console.log('----Result------')
console.log(group2);