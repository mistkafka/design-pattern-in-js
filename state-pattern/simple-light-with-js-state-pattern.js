function Light() {
}

const FSM = {
    on: {
        changeState(light) {
            light.currState = FSM.off;
            console.log('关灯');
        }
    },
    off: {
        changeState(light) {
            light.currState = FSM.on;
            console.log('开灯');
        }
    }
}

Light.prototype.init = function () {
    let $switchBtn = document.createElement('button');
    $switchBtn.innerText = '开关'
    document.body.appendChild($switchBtn);

    this.currState = FSM.off;

    $switchBtn.addEventListener('click', () => {
        this.currState.changeState(this);
    });
}

let light = new Light();
light.init();
