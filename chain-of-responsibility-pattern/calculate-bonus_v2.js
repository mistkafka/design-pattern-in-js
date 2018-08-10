/**
 * 计算员工奖金v2
 * v1版指的是书上的版本。v2版本采用“职责连模式” + “策略模式”来共同完成奖金计算。
 *
 */


 // 首先，是决策链
 function performanceDecisionForS(revenue) {
     if (revenue > 20000) {
         return 'S'
     } else {
         return null;
     }
 }

 function performanceDecisionForA(revenue) {
     if (revenue > 10000) {
         return 'A'
     } else {
         return null;
     }
 }

 function performanceDecisionForB(revenue) {
    return 'B';
 }

 const performanceDecisions = [
     performanceDecisionForS,
     performanceDecisionForA,
     performanceDecisionForB
 ];

function getPerformance(revenue) {
    return performanceDecisions
        .map(fn => fn(revenue))
        .filter(rslt => rslt !== null)[0];
 }

 // 然后定义不同绩效等级的奖金策略
const strategies = {
    'S': (salary) => salary * 4,
    'A': (salary) => salary * 3,
    'B': (salary) => salary * 2,
};

// 最后，进行奖金计算

 /**
  * 计算奖金
  * @param  {} revenue 营业额
  * @param  {} salary 薪资
  * @returns bouns: 奖金
  */
 function calcBouns(revenue, salary) {
     const performance = getPerformance(revenue);
     const bouns = strategies[performance](salary);

     return bouns;
 }