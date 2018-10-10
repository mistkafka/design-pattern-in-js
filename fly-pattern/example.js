
// 内部状态sex，在实例化的时候就确认
function Model(sex) {
    this.sex = sex;
    this.underwear = null;
}

// 外部状态，underwear 在拍照的时候直接设置
// 当然，还可以另外提供一个类似setState的函数来专门负责状态设置
Model.prototype.takePhoto = function(underwear) {
    this.underwear = underwear;
    console.log(`sex=${this.sex}, underwear=${this.underwear}, take photo done!`);
}

// 性别是内部状态，通过一个manager管理起来
const insMap = {};
function getModel(sex) {
    if (!insMap[sex]) {
        insMap[sex] = new Model(sex);
    }

    return insMap[sex];
}

// 拍摄男性的50套衣服
for (let i = 0; i < 50; i++) {
    const model = getModel('male');
    model.takePhoto(i);
}

// 拍摄女性的50套衣服
for (let i = 0; i < 50; i++) {
    const model = getModel('famale');
    model.takePhoto(i);
}

// 看一下总共需要多少个model?
console.log(insMap);
