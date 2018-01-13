class Rule {
  constructor(results, options) {
    this.results = results
    this.options = options

    return this.main()
  }

  main() {
    // 查询结果与选项进行比较
    return new Promise((resolve, reject) => {
      const weights = []
      this.results.forEach((result) => {
        this.options.forEach((option, idx) => {
          // 字数太少的时候就合并查找
          if (option.join('').length <= 2) {
            const reg = new RegExp(option.join(''), 'g')
            const match = result.match(reg) || []
            weights[idx] = (weights[idx] || 0) + match.length
          } else {
            option.forEach((item) => {
              const reg = new RegExp(item, 'g')
              const match = result.match(reg) || []
              weights[idx] = (weights[idx] || 0) + match.length
            })
          }
        })
      })

      resolve(weights)
    })
  }
}

module.exports = Rule
