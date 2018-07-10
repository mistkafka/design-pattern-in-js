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
    this.changeState('signning');
    
    setTimeout(() => {
        // 1s后扫描完毕，进入上传
        this.changeState('uploading');
    }, 1000);

    setTimeout(() => {
        // 10s后上传完毕
        this.changeState('upload-success');
    }, 1000 * 10);
}

Upload.prototype.changeState = function(state) {
    switch(state) {
    case 'signning':
        this.$button1.style.display = 'none';
        this.$button2.style.display = 'none';
        
        this.plugin.sign();
        break;
        
    case 'uploading':
        this.$button1.style.display = 'block';
        this.$button1.innerText = '暂停';
        this.$button2.style.display = 'none';
        
        this.plugin.uploading();
        break;
        
    case 'upload-success':
        this.$button1.style.display = 'none';
        this.$button2.style.display = 'block';
        this.$button2.innerText = '删除';

        this.plugin.done();
        
        break;
        
    case 'upload-failed':
        this.$button1.style.display = 'none';
        this.$button2.style.display = 'block';
        this.$button2.innerText = '删除';
        
        break;
        
    case 'pause':
        this.$button1.style.display = 'blcok';
        this.$button1.innerText = '继续上传';
        this.$button2.style.display = 'block';
        this.$button2.innerText = '删除';
        
        this.plugin.pause();
        break;
        
    case 'deleted':
        this.$button1.style.display = 'none';
        this.$button2.style.display = 'none';
        
        this.plugin.del();
        break;
        
    }

    this.state = state;
}

Upload.prototype.pressBtn1 = function() {
    switch(this.state) {
    case 'signning':
        // do nonthing
        break;
    case 'uploading':
        this.changeState('pause');
        break;
    case 'upload-success':
        // do nothing
        break;
    case 'upload-failed':
        // do nothing
        break;
    case 'pause':
        this.changeState('uploading');
        break;
    case 'deleted':
        // do nothing
        break;
    }
}

Upload.prototype.pressBtn2 = function() {
    switch(this.state) {
    case 'signning':
        // do nonthing
        break;
    case 'uploading':
        // do nothing
        break;
    case 'upload-success':
        this.changeState('deleted');
        break;
    case 'upload-failed':
        this.changeState('deleted');
        break;
    case 'pause':
        this.changeState('deleted');
        break;
    case 'deleted':
        // do nothing
        break;
    }
}

let upload = new Upload();
upload.init();
