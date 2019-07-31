/**
 * 手动实现一个大概的promise
 */


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const STATE = { PENDING, FULFILLED, REJECTED };

class Promise1 {
  constructor(fn) {
    this.status = STATE.PENDING;
    this.value = undefined;
    this.reason = undefined;

    let resolve = (value) => {
      if (this.status === STATE.PENDING) {
        this.status = STATE.FULFILLED;
        this.value = value;
      }
    }
    let reject = (reason) => {
      if (this.status === STATE.PENDING) {
        this.status = STATE.REJECT;
        this.reason = reason;
      }
    }
    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  // then实例方法中需要返回一个promise对象
  then(onResolved, onRejected) {
    if (this.status === STATE.FULFILLED) {
      onResolved(this.value);
    } else if (this.status === STATE.FULFILLED) {
      onRejected(this.reason);
    };
    return new Promise1((resolve, reject) => {
      resolve(this.value);
    });
  }
  // catch方法未完善
  catch(onRejected) {
    if (this.status === STATE.FULFILLED) return;
    onRejected(this.reason);
  }
}
Promise1.resolve = function (value) {
  return new Promise1((resolve, reject) => {
    resolve(value);
  });
}
Promise1.reject = (reason) => {
  console.log('reject');
}



