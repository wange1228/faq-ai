const Bang = require('./bang')

class Filter {
  constructor(text) {
    this.text = text

    return this.main()
  }

  main() {
    return new Bang(this.text).then((res) => {
      const data = res.data[0][0] || []
      const keyArr = []

      data.forEach((val) => {
        if (!['mMod', 'mRang', 'mAux', 'mPunc', 'mDegr'].includes(val.semrelate)) {
          keyArr.push(val.cont)
        }
      })

      return keyArr
    }).catch((err) => {
      // console.log(err)
    })
  }

  static arr2str(sep, ...args) {
    const distinct = [...new Set(...args)]
    return distinct.join(sep)
  }

  static arrCompare(source, target) {
    const arr = source.concat() // 复制数组
    target.forEach((t) => {
      if (arr.includes(t)) {
        arr.splice(arr.indexOf(t), 1)
      }
    })

    return arr
  }
}

module.exports = Filter
