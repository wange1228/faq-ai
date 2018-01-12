import browserAction from '../api/browserAction'
import { focusOrCreateTab } from '../util/helper'
import runtime from '../api/runtime'

let tmpProblem = ''
let tmpTips = []

startListening()

/**
 * 开始监听浏览器事件
 */
function startListening () {
  browserAction.onClicked = function (tab) {
    const url = chrome.extension.getURL('cddh.html')

    focusOrCreateTab(url)
  }

  runtime.onMessage = function ({ type, params: { problem, options } = {}, option = '', num = '' }) {
    if (type === 'search') {
      if (tmpProblem !== problem) {
        const url = `https://www.baidu.com/s?ie=utf-8&wd=${encodeURIComponent(problem)}`
        focusOrCreateTab(url)
        tmpProblem = problem
      }
    }
    if (type === 'answer') {
      const url = 'chrome-extension://hbhjajefdgijidafmbmdfhnkeekjnlcn/cddh.html'
      focusOrCreateTab(url)
    }
  }
}
