class User {
    constructor (name) {
        this.name = name;
        this.otherUsers = [];
    }

    sendMessage(msg) {
        this.otherUsers.forEach(user => {
            user.receiveMessage(this, msg);
        })
    }

    receiveMessage(sender, msg) {
        console.log(`用户：${this.name}，接收到了来自${sender.name}的消息：${msg}`);
    }

    addUser(user) {
        this.otherUsers.push(user);
        return this;
    }
}

// 实例化
let user1 = new User('小明');
let user2 = new User('小白');
let user3 = new User('小黑');

// 需要手动让每个“同事”持有“其它同事”的引用
// 这里的“同事”一词来自，“中介者模式”
user1.addUser(user2).addUser(user3);
user2.addUser(user1).addUser(user3);
user3.addUser(user1).addUser(user2);

// 执行action
user2.sendMessage('大家好！我是小白。');

// 如果加入一个、删除一个“同事”，每个“同事”都需要有所改动
let user4 = new User('小哈');
user4.addUser(user1).addUser(user2).addUser(user3);
user1.addUser(user4);
user2.addUser(user4);
user3.addUser(user4);

user4.sendMessage('大家好，我是新来的小哈！')
