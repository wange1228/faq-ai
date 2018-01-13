const baidu = require('baidu-search')
const Filter = require('./filter')

class Search {
  constructor(text) {
    this.text = encodeURIComponent(text)

    return this.main()
  }

  main() {
    return new Promise((resolve, reject) => {
      baidu(this.text, (err, res) => {
        const arr = []
        res.links.forEach((item) => {
          arr.push(item.description)
        })
        // 把当页搜索结果列表连接成字符串一起输出
        resolve(arr.join(''))
      })
    })
  }

  static excludeKeyword(keywordArr) {
    const keywordStr = Filter.arr2str(' | ', keywordArr)
    return `-(${keywordStr})`
  }

  static includeKeyword(keywordArr) {
    return Filter.arr2str(' ', keywordArr)
  }
}

module.exports = Search
