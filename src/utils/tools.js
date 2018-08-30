class SimplePagination() {
  constructor(totalPageCount) {
    if (!totalPageCount) return
    this.state = {
      pageNumber: 1,
      totalPageCount
    }
  }

  init(paramsObj) {
    let state = this.state
    // 页面元素的外部容器
    state.container = paramsObj.container || 'body'
    // 不包括第一个和最后一个元素，中间最多可展示几个元素
    state.maxShowBtnCount = paramsObj.maxShowBtnCount || 5
    // 包括上一页和下一页，所以页面元素的class
    state.pCName = paramsObj.pCName || 'page-li'
    // 某一页选中时的类
    state.activeCName = paramsObj.activeCName || 'page-active'
    // 代表页码数字的属性
    state.dataNumberAttr = paramsObj.dataNumberAttr || 'data-number'
    // 上一页的类名
    state.prevCName = paramsObj.prevCName || 'page-prev'
    // 下一页的类名
    state.nextCName = paramsObj.nextCName || 'page-next'
    // 加上禁用上一页的类名
    state.disablePrevCName = paramsObj.disablePrevCName || 'no-prev'
    // 加上禁用下一页的类名
    state.disableNextCName = paramsObj.disableNextCName || 'no-next'
    // 不包扩上一页、下一页、省略号元素的类名
    state.pageNumberCName = paramsObj.pageNumberCName || 'page-number'
    // 出发切换页面的事件
    state.swEvent = paramsObj.swEvent || 'click'
    // 切换页面时调用的函数
    state.onPageChange = paramsObj.onPageChange
    // 当需要省略号占位时，确定active的位置
    state.totalPageCount > state.maxShowBtnCount + 2 && (state.activePosition = Math.ceil(state.maxShowBtnCount / 2))
  }

  // 切换页码的函数，改变pageNumber
  switchPage() {
    let state = this.state
    let pCNameList = this.selectorEle('.' + state.pCName, true)
    let pageNumber
    pCNameList.forEach(item => {
      item.addEventListener(state.swEvent,  e => {
        const currentPageEle = e.target
        if (this.hasClass(currentPageEle, state.activeCName)) return
        let dataNumberAttr = currentPageEle.getAttribute(state.dataNumberAttr)
        // 点击数字按钮
        if (dataNumberAttr) {
          pageNumber = +dataNumberAttr
          // 点击 上一页 按钮
        } else if (this.hasClass(currentPageEle, prevCName)) {
          state.pageNumber > 1 && (pageNumber = state.pageNumber - 1)
          // 点击 下一页 按钮
        } else if (this.hasClass(currentPageEle, nextCName)) {
          state.pageNumber < state.totalPageCount && (pageNumber = state.pageNumber + 1)
        }
        pageNumber && this.gotoPage(pageNumber)
      })
    })
  }

  switchNextPrevAble(evaNumberLi) {
    let state = this.state
    let nextBtn = this.selectorEle('.' + state.nextCName)
    let prevBtn = this.selectorEle('.' + state.prevCName)
    // 若当前是第一页，则禁止点击上一页
    state.pageNumber > 1
    ? this.hasClass(prevBtn, state.disablePrevCName) && this.removeClass(prevBtn, state.disablePrevCName)
    : this.hasClass(prevBtn, state.disablePrevCName) && this.addClass(prevBtn, state.disablePrevCName)
    // 若当前是最后一页，则禁止点击下一页
    state.pageNumber < state.totalPageCount
    ? this.hasClass(nextBtn, state.disableNextCName) && this.removeClass(nextBtn, state.disableNextCName)
    : this.hasClass(nextBtn, state.disableNextCName) && this.addClass(nextBtn, state.disableNextCName)
  }

  renderPageDom() {
    let state = this.state
    let pageContainer = this.selectorEle(state.container)
    if (!pageContainer) return
    let {totalPageCount, pCName, activeCName, dataNumberAttr, disableNextCName,
      disablePrevCName, prevCName, nextCName, maxShowBtnCount, pageNumberCName} = state
    let paginationStr = `
    <ul class="pagination">
    <li class="${pCName} ${prevCName} ${disableNextCName}">上一页</li>
    <li class="${pCName} ${pageNumberCName} ${activeCName}" ${dataNumberAttr}='1'>1</li>
    `
    if (totalPageCount - 2 > maxShowBtnCount) {
      paginationStr += `
        <li class="${pCName} number-ellipsis ellipsis-head">...<li>
      `
      for (let i = 2; i < maxShowBtnCount + 2; i++) {
        paginationStr += `<li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${i}'>${i}</li>`
      }

    paginationStr += `
      <li class="${pCName} number-ellipsis ellipsis-tail">...</li>
      <li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}=${totalPageCount}>${totalPageCount}</li>
    `
    } else {
      for (let i = 2; i < totalPageCount; i++) {
        paginationStr += `
          <li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${i}'>${i}</li>
        `
      }
    }
    pageContainer.innerHTML = paginationStr
  }

  isIllegal(pageNumber) {
    let state = this.state
    return (
      state.pageNumber === pageNumber // 检查点击的是否是当前页
      || Math.ceil(pageNumber) !== pageNumber // 检查输入的是否为整数
      || pageNumber > state.totalPageCount // 检查是否为最后一页
      || pageNumber < 1 // 检查是否为第一页
      || typeof pageNumber !== 'number' // 检查输入是否是数字
      || pageNumber !== pageNumber //检查是否是NaN的情况
    )
  }

  hiddenEllipse(selector, shouldHidden = true) {
    shouldHidden
    ? this.selectorEle(selector).style.display = 'none'
    : this.selectorEle(selector).style.display = ''
  }

  selectorEle(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
  }

  hasClass(eleObj, className) {
    return eleObj.className.indexOf(className) !== -1
  }

  addClass(eleObj, className) {
    if (!hasClass(eleObj, className)) {
      eleObj.className = eleObj.className + ' ' + className
    }
  }

  removeClass(eleObj, className) {
    if (hasClass(eleObj, className)) {
      eleObj.className = eleObj.className.split(' ').filter((item) => item !== className).join(' ')
    }
  }
}
