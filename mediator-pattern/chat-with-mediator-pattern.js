
class User {
    constructor(name, hub) {
        this.name = name;
        this.hub = hub;
    }

    login() {
        this.hub.login(this);
    }

    logout() {
        this.hub.logout(this);
    }

    sendMessage(msg) {
        this.hub.sendMessage(this, msg);
    }

    receiveMessage(sender, msg) {
        console.log(`用户：${this.name}，接收到了来自${sender.name}的消息：${msg}`);
    }
}

// 在一个典型的C/S聊天室里，这个ChatHub承担的是服务器的角色
class ChatHub {
    constructor () {
        this.users = new Map();
    }

    login (user) {
        let userName = user.name;
        this.users.set(userName, user);
    }

    logout (user) {
        let userName = user.name;
        this.users.delete(userName);
    }

    sendMessage (sender, msg) {
        for (let [name, user] of this.users) {
            if (user !== sender) {
                user.receiveMessage(sender, msg);
            }
        }
    }
}


let hub = new ChatHub();
let users = [
    new User('小白', hub),
    new User('小红', hub),
    new User('小黑', hub),
    new User('小蓝', hub),
    new User('小青', hub),
];
users.forEach(user => {
    user.login();
})

let user1 = users[0];
user1.sendMessage('大家好，我是小白！');

// 如果要删除、或者新增一个用户也是很简单的
let user = new User('新用户', hub);
user.login();
user1.sendMessage('大家好，我是小白！');
