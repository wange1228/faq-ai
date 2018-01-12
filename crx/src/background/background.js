import browserAction from '../api/browserAction'
import { createTab, focusTab } from '../util/helper'
import runtime from '../api/runtime'

let tmpProblem = ''

startListening()

/**
 * 开始监听浏览器事件
 */
function startListening () {
  browserAction.onClicked = function (tab) {
    const url = chrome.extension.getURL('cddh.html')

    createTab(url)
  }

  runtime.onMessage = function ({ type, params: { problem, options } = {}, option = '', num = '' }) {
    if (type === 'search') {
      if (tmpProblem !== problem) {
        const url = `https://www.baidu.com/s?ie=utf-8&wd=${encodeURIComponent(problem)}`
        createTab(url)
        tmpProblem = problem
      }
    }
    if (type === 'answer') {
      const url = 'chrome-extension://hbhjajefdgijidafmbmdfhnkeekjnlcn/cddh.html'
      focusTab(url)
    }
  }
}
