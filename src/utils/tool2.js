class SimplePagination() { // es6引入的class类，这是构造函数的另一种写法
  constructor(totalPageCount) {
    if (!totalPageCount) return
    this.state = {
      pageNumber: 1,
      totalPageCount
    }
  }
}

function SimplePagination(totalPageCount) {
  if (!totalPageCount) return
    this.state = { // this代表实例对象
      pageNumber: 1,
      totalPageCount
    }
}
