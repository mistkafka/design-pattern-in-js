/* command的接口定义 */
interface Command {
    receiver: any;
    execute: () => void | Promise<any>;/* 某些执行可能是异步的 */
    undo: () => void | Promise<any>;
}

/* moveable，这里是本例的receiver的接口定义，receiver当然会有多种 */
interface Moveable {
    move: (TDirection) => void | Promise<any>;
}

/* 命令的发送者，这里是button。不去实现了。*/
interface Requester {
    registerCommand: () => void;
}

type TDirection = 'left' | 'right' | 'up' | 'down';

function getTimer(second): Promise<any> {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve();
        }, second * 1000)
    });
}

class MoveCommand implements Command {
    receiver: Moveable | null;
    private direction: TDirection;

    constructor(receiver: Moveable, direction: TDirection) {
        this.direction = direction;
        this.receiver = receiver;
    }

    execute() {
        return this.receiver.move(this.direction);
    }

    undo() {
        return this.receiver.move(this.reverseDirection(this.direction));
    }

    private reverseDirection(direction: TDirection): TDirection {
        const reverseDirectionMap = {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up'
        };

        return reverseDirectionMap[direction] as TDirection;
    }
}

class ObedientBall implements Moveable {
    private radius: number;
    private moveDistance: number;
    private speedTime: number;
    private color: string;
    private $ball: HTMLDivElement;

    constructor(radius: number = 20, moveDistance: number = 100, speedTime: number = 1, color: string = 'blue') {
        this.radius = 20;
        this.moveDistance = moveDistance;
        this.speedTime = speedTime;
        this.color = color;

        this.$ball = this.generateBall();
    }

    generateBall(): HTMLDivElement {
        const $ball = window.document.createElement('div');

        $ball.style.backgroundColor = this.color;

        const diameter = (2 * this.radius) + 'px';
        $ball.style.width = diameter;
        $ball.style.height = diameter;
        $ball.style.borderRadius = '50%';

        $ball.style.position = 'absolute';
        $ball.style.top = '0';
        $ball.style.left = '0';

        /* 把命令的执行改成异步的 */
        $ball.style.transition = `top ${this.speedTime}s, left ${this.speedTime}s`;

        const $playground = window.document.querySelector('#playground');
        $playground.appendChild($ball);

        return $ball;
    }

    move(direction: TDirection): Promise<any> {
        const moveDirection2TopLeftMapping = {
            up: [-this.moveDistance, 0],
            down: [this.moveDistance, 0],
            left: [0, -this.moveDistance],
            right: [0, this.moveDistance],
        };

        const moveInfo: number[] = moveDirection2TopLeftMapping[direction];

        this.$ball.style.top = this.pxPlus(this.$ball.style.top, moveInfo[0]);
        this.$ball.style.left = this.pxPlus(this.$ball.style.left, moveInfo[1]);

        return getTimer(this.speedTime);
    }

    private pxPlus(px: string, num: number): string {
        const pxNum = Number.parseInt(px);
        return (pxNum + num) + 'px';
    }
}

const ball = new ObedientBall();
const commandQueque: Command[] = [];  /* 执行的命令队列 */
let executeP = Promise.resolve(); /* 最新的执行命令的promise */

/* 命令的注册。如上文所说，这里就不封装了。实际应该封装的。因为button所绑定的commnd是容易变的。所以，把绑定、解绑封装一下是有必要的。 */
const $buttons = Array.from(window.document.querySelectorAll('button'));
[
    'left',
    'right',
    'up',
    'down'
].forEach((direction, index) => {
    const $button = $buttons[index];
    $button.textContent = direction;
    $button.addEventListener('click', () => {
        const command = new MoveCommand(ball, direction as TDirection);
        commandQueque.push(command);
        executeP = executeP.then(() => {
            return command.execute();
        });
    });
})

$buttons[4].addEventListener('click', () => {
    const latestCmd = commandQueque.pop();
    if (latestCmd !== undefined) {
        executeP = executeP.then(() => {
            return latestCmd.undo();
        });
    }
});
