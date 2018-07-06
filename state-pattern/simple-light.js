function Light() {

}

Light.prototype.init = function() {
    let $switchBtn = document.createElement('button');
    $switchBtn.innerText = '开关'
    document.body.appendChild($switchBtn);
    this.state = 'off';

    $switchBtn.addEventListener('click', this.pressSwitch.bind(this))
}

Light.prototype.pressSwitch = function() {

    // if-else的脆弱在于：
    //  不同“转换”规则的修改都需要修改这个函数；新增、删除规则也要修改这个函数。也就是影响了开闭原则
    if (this.state === 'off') {
        this.state = 'on';
        console.log('开灯！');
    } else if (this.state === 'on') {
        this.state = 'off';
        console.log('关灯！');
    }
}

let light = new Light();
light.init();
