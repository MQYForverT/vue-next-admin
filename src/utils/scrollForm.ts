// el-form 滚动验证
const scrollForm = (refs: Object, object: Object) => {
  for (const i in object) {
    let dom: any = refs[i]
	console.log(dom)
    if (Object.prototype.toString.call(dom) !== '[object Object]') {
      // 这里是针对遍历的情况（多个输入框），取值为数组
      dom = dom[0]
      break
    }
    dom.$el.scrollIntoView({
      // 滚动到指定节点
      block: 'center', // 值有start,center,end，nearest，当前显示在视图区域中间
      behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
    })
  }
  console.log('error submit!!')
  return false
}

export default scrollForm