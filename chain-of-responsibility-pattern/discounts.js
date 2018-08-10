/**
 * 可以看到，这个决策函数有两个因素：
 * 1. 订单类型
 * 2. 是否已经支付
 * 
 * 如果决策因素增加，if-else也会剧增！
 * 
 * @param  {} orderType 订单类型
 * @param  {} isPayed   是否已经支付
 */
function getDiscountsType(orderType, isPayed) {
    if (!isPayed) {
        return 'normal';
    } else if (isPayed && orderType === 'prepayed-500') {
        return 'discount-100';
    } else if (isPayed && orderType === 'prepayed-200') {
        return 'discount-50';
    } else {
        return 'normal';
    }
}