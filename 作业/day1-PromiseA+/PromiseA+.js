/***
 * 先把关键的几个点列出来
 * 逐个满足 
 * 首先 需要先定义三个状态 pending fulfilled rejected
 * 然后在构造Promise对象时,默认状态应该为pending
 * 在Promise中需要有then方法,且then方法会有两个参数,分别是成功时的回调函数和失败时的回调函数
 */
const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

class Promise {
  constructor(executor) {
    this.status = PENDING //默认状态
    this.value = undefined
    this.reason = undefined
    //成功时的回调函数
    let resolve = (value) => {
      //实现状态单向流转
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }
    //失败时的回调
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  //then接收两个参数,成功时的回调函数和失败时的回调函数
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}
