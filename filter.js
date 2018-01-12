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
        if (!['mRang', 'mAux', 'mPunc', 'mDegr'].includes(val.semrelate)) {
          keyArr.push(val.cont)
        }
      })

      return keyArr.join(' ')
    })
  }
}

module.exports = Filter
