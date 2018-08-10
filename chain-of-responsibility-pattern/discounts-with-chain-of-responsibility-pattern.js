// 我们先定义各个“策略“函数
// 它们接受的参数应该是一致的，返回结果也是一致的。

function tryApplyDiscounts100Discounts(orderType, isPayed) {
    if (isPayed === true && orderType === 'prepayed-500') {
        return 'discount-100';
    } else {
        // 上层可以约定，当返回null时表示不采用此策略
        return null; 
    }
}

function tryApplyDiscounts50Discounts(orderType, isPayed) {
    if (isPayed === true && orderType === 'prepayed-200') {
        return 'discount-50';
    } else {
        return null;
    }
}


function tryApplyNormalDiscounts(orderType, isPayed) {
    // 这个作为默认策略，不需要限定什么条件
    return 'normal';
}


// 接着，我们设计一种“链”的模式，这里采用数组+for循环。
// 书上也可以采用AOP实现链式调用

const discountsDecisionMakers = [
    tryApplyDiscounts100Discounts,
    tryApplyDiscounts50Discounts,
    tryApplyNormalDiscounts
];

function getDiscountsType(orderType, isPayed) {
    // 这里选择直接遍历一遍数组，取出所有允许的优惠策略
    // 实际上找到第一个允许的优惠策略就可以了    
    const allowedTypes = discountsDecisionMakers
        .map(decisionMakerFn => decisionMakerFn(orderType, isPayed))
        .filter(rslt => rslt !== null);

    // 取出“最优”的优惠策略
    const firstAllowedType = allowedTypes[0];

    return firstAllowedType;
}