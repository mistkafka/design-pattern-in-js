function getTimer(second) {
    return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
            resolve();
        }, second * 1000);
    });
}
var MoveCommand = /** @class */ (function () {
    function MoveCommand(receiver, direction) {
        this.direction = direction;
        this.receiver = receiver;
    }
    MoveCommand.prototype.execute = function () {
        return this.receiver.move(this.direction);
    };
    MoveCommand.prototype.undo = function () {
        return this.receiver.move(this.reverseDirection(this.direction));
    };
    MoveCommand.prototype.reverseDirection = function (direction) {
        var reverseDirectionMap = {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up'
        };
        return reverseDirectionMap[direction];
    };
    return MoveCommand;
}());
var ObedientBall = /** @class */ (function () {
    function ObedientBall(radius, moveDistance, speedTime, color) {
        if (radius === void 0) { radius = 20; }
        if (moveDistance === void 0) { moveDistance = 100; }
        if (speedTime === void 0) { speedTime = 1; }
        if (color === void 0) { color = 'blue'; }
        this.radius = 20;
        this.moveDistance = moveDistance;
        this.speedTime = speedTime;
        this.color = color;
        this.$ball = this.generateBall();
    }
    ObedientBall.prototype.generateBall = function () {
        var $ball = window.document.createElement('div');
        $ball.style.backgroundColor = this.color;
        var diameter = (2 * this.radius) + 'px';
        $ball.style.width = diameter;
        $ball.style.height = diameter;
        $ball.style.borderRadius = '50%';
        $ball.style.position = 'absolute';
        $ball.style.top = '0';
        $ball.style.left = '0';
        /* 把命令的执行改成异步的 */
        $ball.style.transition = "top " + this.speedTime + "s, left " + this.speedTime + "s";
        var $playground = window.document.querySelector('#playground');
        $playground.appendChild($ball);
        return $ball;
    };
    ObedientBall.prototype.move = function (direction) {
        var moveDirection2TopLeftMapping = {
            up: [-this.moveDistance, 0],
            down: [this.moveDistance, 0],
            left: [0, -this.moveDistance],
            right: [0, this.moveDistance]
        };
        var moveInfo = moveDirection2TopLeftMapping[direction];
        this.$ball.style.top = this.pxPlus(this.$ball.style.top, moveInfo[0]);
        this.$ball.style.left = this.pxPlus(this.$ball.style.left, moveInfo[1]);
        return getTimer(this.speedTime);
    };
    ObedientBall.prototype.pxPlus = function (px, num) {
        var pxNum = Number.parseInt(px);
        return (pxNum + num) + 'px';
    };
    return ObedientBall;
}());
var ball = new ObedientBall();
var commandQueque = [];
var executeP = Promise.resolve();
var $buttons = Array.from(window.document.querySelectorAll('button'));
[
    'left',
    'right',
    'up',
    'down'
].forEach(function (direction, index) {
    var $button = $buttons[index];
    $button.textContent = direction;
    $button.addEventListener('click', function () {
        var command = new MoveCommand(ball, direction);
        commandQueque.push(command);
        executeP = executeP.then(function () {
            return command.execute();
        });
    });
});
$buttons[4].addEventListener('click', function () {
    var latestCmd = commandQueque.pop();
    if (latestCmd !== undefined) {
        executeP = executeP.then(function () {
            return latestCmd.undo();
        });
    }
});
