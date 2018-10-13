/* event, message都是一个意思。js里，更喜欢用Event */
var WeiboHuati = /** @class */ (function () {
    function WeiboHuati() {
        this.registerTable = {};
    }
    WeiboHuati.prototype.register = function (huati, cb) {
        /* 获取话题的关注者列表 */
        var huatiFollowers = this.getHuatiFollers(huati);
        /* 加入关注者列表 */
        huatiFollowers.add(cb);
        return {
            unregister: function () {
                /* 移出关注者列表 */
                huatiFollowers["delete"](cb);
            }
        };
    };
    /**
     * 发布订阅者模式的弊端在于，你可能经常不知道谁触发了消息。
     * 毕竟两者解耦了嘛！所以，如果能在 publish 打印相关的日
     * 志是比较好的，当然可以做个开关，调错的时候再开启。
     */
    WeiboHuati.prototype.publish = function (huati, content) {
        var huatiFollowers = this.getHuatiFollers(huati);
        huatiFollowers.forEach(function (cb) {
            cb(content);
        });
    };
    WeiboHuati.prototype.getHuatiFollers = function (huati) {
        var huatiFollowers = this.registerTable[huati];
        if (!huatiFollowers) {
            huatiFollowers = new Set();
            this.registerTable[huati] = huatiFollowers;
        }
        return huatiFollowers;
    };
    return WeiboHuati;
}());
/* 跑起来试试 */
var weiboHuati = new WeiboHuati();
var listener1 = weiboHuati.register('鹿晗结婚了', function (newWeibo) {
    console.log('我是小白，从“#鹿晗结婚了”话题接收到新消息：' + newWeibo);
});
weiboHuati.publish('鹿晗结婚了', '新浪微博服务器挂了！');
weiboHuati.publish('鹿晗结婚了', '工程师苦命了！');
var listener2 = weiboHuati.register('鹿晗结婚了', function (newWeibo) {
    console.log('我是小黑，从“#鹿晗结婚了”话题接收到新消息：' + newWeibo);
});
weiboHuati.publish('鹿晗结婚了', '为什么调程序员小哥哥结婚的时候，发布微博。。。');
weiboHuati.publish('鹿晗结婚了', '23333');
/* 小白取消订阅 */
listener1.unregister();
weiboHuati.publish('鹿晗结婚了', '好了，散了吧！这群脑残粉，有什么好关注的。');
var listener3 = weiboHuati.register('鹿晗结婚了', function (newWeibo) {
    console.log('我是小红，从“#鹿晗结婚了”话题接收到新消息：' + newWeibo);
});
