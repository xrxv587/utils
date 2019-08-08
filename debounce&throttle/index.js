/**
 * js函数防抖
 * 解释：
 *    单位倒计时后执行fn方法，如果再次出发debounce就重置单位倒计时 
 */
function debounce(fn, delay) {
  let timeId = null;
  let args = arguments;
  return function() {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      fn.call(this, args);
      timeId = null;
    }, delay);
  }
}

/**
 * js函数节流
 * 解释：
 *    单位时间内fn方法只会执行一次 
 */
function throttle(fn, await) {
  let timeId = null;
  let args  = arguments;
  return () => {
    if (!timeId) {
      fn.call(this, args);
      timeId = setTimeout(() => {
        timeId = null;
      }, await);
    }
  }
}