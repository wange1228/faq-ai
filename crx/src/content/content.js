import $ from 'jquery'
import runtime from '../api/runtime'
import { getParams } from '../util/helper'

$(function () {
  const reg = /(\d+,?)+/
  if ($('#wrapper_wrapper .nums') && $('#wrapper_wrapper .nums')[0]) {
    const params = getParams()
    const wd = params.wd
    const match = /(.+)\s+\+?(.+)/
    const option = match.exec(decodeURIComponent(wd))[2]
    const num = reg.exec($('#wrapper_wrapper .nums')[0].innerText)[0]

    runtime.sendMessage({
      type: 'tip',
      option,
      num: num.replace(/,/g, '')
    })
  }
})
