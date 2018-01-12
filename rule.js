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
          const reg = new RegExp(option, 'g')
          const match = result.match(reg) || []
          weights[idx] = (weights[idx] || 0) + match.length
        })
      })
      resolve(weights)
    })
  }
}

module.exports = Rule
