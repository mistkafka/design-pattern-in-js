function Light() {
}

Light.prototype.init = function () {
    let $switchBtn = document.createElement('button');
    $switchBtn.innerText = '开关'
    document.body.appendChild($switchBtn);

    this.onState = new OnState(this);
    this.offState = new OffState(this);
    this.currState = this.onState;

    $switchBtn.addEventListener('click', () => {
        // 每个状态类都实现`changeState'，
        // 电灯类用`currState'保存“当前状态”
        // 通过多态，将原本的if-else内化掉
        this.currState.changeState();
    });
}

function State(light) {
    this.light = light;
}


State.prototype.changeState = function () {
    throw Error('请实现changeState');
}

function OnState(light) {
    State.call(this, light);
}

OnState.prototype.changeState = function () {
    this.light.currState = this.light.offState;
    console.log('关灯');
}

function OffState(light) {
    State.call(this, light);
}
OffState.prototype.changeState = function () {
    this.light.currState = this.light.onState;
    console.log('开灯');
}

let light = new Light();
light.init();
