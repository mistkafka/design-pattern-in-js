const plugin = (function () {
    let plugin = document.createElement('embed');
    plugin.style.display = 'none';
    plugin.type = 'application/txftn-webkit';

    plugin.sign = function() {
        console.log('开始扫描文件');
    };

    plugin.pause = function() {
        console.log('暂停文件上传');
    }

    plugin.del = function() {
        console.log('删除文件');
    }

    plugin.uploading = function() {
        console.log('开始文件上传');
    }

    plugin.done = function() {
        console.log('文件上传完成');
    }

    document.body.appendChild(plugin);

    return plugin;
})();

function SignningState(upload) {
    this.upload = upload;
}
SignningState.prototype.pressBtn1 = function () {
    // do nothing
}
SignningState.prototype.pressBtn2 = function () {
    // do nothing
}
SignningState.prototype.applyState = function () {
    let upload = this.upload;

    upload.$button1.style.display = 'none';
    upload.$button2.style.display = 'none';
    
    upload.plugin.sign();
}

function UploadingState(upload) {
    this.upload = upload;
}
UploadingState.prototype.pressBtn1 = function () {
    this.upload.applyState(this.upload.pauseState);
}

UploadingState.prototype.pressBtn2 = function () {
    // do nothing
}
UploadingState.prototype.applyState = function () {
    let upload = this.upload;
    
    upload.$button1.style.display = 'block';
    upload.$button1.innerText = '暂停';
    upload.$button2.style.display = 'none';
    
    upload.plugin.uploading();
}

function UploadSuccessState(upload) {
    this.upload = upload;
}
UploadSuccessState.prototype.pressBtn1 = function () {
    // do nothing
}
UploadSuccessState.prototype.pressBtn2 = function () {
    this.upload.applyState(this.upload.deletedState);
}
UploadSuccessState.prototype.applyState = function () {
    let upload = this.upload;
    
    upload.$button1.style.display = 'none';
    upload.$button2.style.display = 'block';
    upload.$button2.innerText = '删除';

    upload.plugin.done();
}

function UploadFailedState(upload) {
    this.upload = upload;
}
UploadFailedState.prototype.pressBtn1 = function () {
    // do nothing
}
UploadFailedState.prototype.pressBtn2 = function () {
    this.upload.applyState(this.upload.deleteState);
}
UploadFailedState.prototype.applyState = function () {
    let upload = this.upload;
    
    upload.$button1.style.display = 'none';
    upload.$button2.style.display = 'block';
    upload.$button2.innerText = '删除';
}

function PauseState(upload) {
    this.upload = upload;
}
PauseState.prototype.pressBtn1 = function () {
    this.upload.applyState(this.upload.uploadingState);
}
PauseState.prototype.pressBtn2 = function () {
    this.upload.applyState(this.upload.deletedState);
}
PauseState.prototype.applyState = function () {
    let upload = this.upload;
    
    upload.$button1.style.display = 'blcok';
    upload.$button1.innerText = '继续上传';
    upload.$button2.style.display = 'block';
    upload.$button2.innerText = '删除';
    
    upload.plugin.pause();
}

function DeletedState(upload) {
    this.upload = upload;
}
DeletedState.prototype.pressBtn1 = function () {
    // do nothing
}
DeletedState.prototype.pressBtn2 = function () {
    // do nothing
}
DeletedState.prototype.applyState = function () {
    let upload = this.upload;
    
    upload.$button1.style.display = 'none';
    upload.$button2.style.display = 'none';
    
    upload.plugin.del();
}

function Upload() {}

Upload.prototype.init = function() {
    let $button1 = document.createElement('button');
    $button1.innerText = 'Button1';    
    let $button2 = document.createElement('button');
    $button1.innerText = 'Button2';

    document.body.appendChild($button1);
    document.body.appendChild($button2);

    $button1.addEventListener('click', this.pressBtn1.bind(this));
    $button2.addEventListener('click', this.pressBtn2.bind(this));

    this.plugin = plugin;
    this.$button1 = $button1;
    this.$button2 = $button2;

    this.signningState = new SignningState(this);
    this.uploadingState = new UploadingState(this);
    this.uploadSuccessState = new UploadSuccessState(this);
    this.uploadFailedState = new UploadFailedState(this);
    this.pauseState = new PauseState(this);
    this.deletedState = new DeletedState(this);

    this.applyState(this.signningState);

    setTimeout(() => {
        // 1s后扫描完毕，进入上传
        this.applyState(this.uploadingState);
    }, 1000);

    setTimeout(() => {
        // 10s后上传完毕
        this.applyState(this.uploadSuccessState);
    }, 1000 * 10);
}

Upload.prototype.applyState = function(state) {
    this.currState = state;
    this.currState.applyState();
}

Upload.prototype.pressBtn1 = function () {
    this.currState.pressBtn1();
}
Upload.prototype.pressBtn2 = function () {
    this.currState.pressBtn2();
}

let upload = new Upload();
upload.init();
