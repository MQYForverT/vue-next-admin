// 防抖/节流函数
//一般情况下，防抖就可以了，因为节流会有副作用，当用户输入的太慢的时候，一旦超过你设置的时间，就会立即请求一次，可能导致丢失一个关键字
export const optimizedInteraction = (fn: Function, delay: number) => {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0
  let timer = null
  // 将throttle处理结果当作函数返回

  return function(...params) {
    // 保留调用时的this上下文
    const context = this
    // 保留调用时传入的参数,使用rest参数代替arguments
    const args = params
    // 记录本次触发回调的时间
    // const now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    // if (now - last < delay) {
    // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
    clearTimeout(timer)
    timer = setTimeout(function() {
      // last = now
      fn.apply(context, args)
    }, delay)
    // } else {
    //   // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
    //   last = now
    //   fn.apply(context, args)
    // }
  }
}