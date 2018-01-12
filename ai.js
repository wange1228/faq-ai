const Filter = require('./filter')
const Search = require('./search')
const Rule = require('./rule')

class Ai {
  constructor(question, options) {
    this.question = question
    this.options = options

    return this.main()
  }

  main() {
    return new Promise((resolve, reject) => {
      Promise.all([
        new Filter(this.question), // 过滤问题
        new Filter(this.options[0]), // 过滤选项A
        new Filter(this.options[1]), // 过滤选项B
        new Filter(this.options[2]), // 过滤选项C
      ]).then((filterRes) => {
        const keyA = this.question // 原提问作为长尾关键词
        const keyB = filterRes[0] // 过滤后的问题作为关键词
        const keyC = `${filterRes[0]} ${filterRes[1]}` // 过滤后的问题+选项A作为关键词
        const keyD = `${filterRes[0]} ${filterRes[2]}` // 过滤后的问题+选项B作为关键词
        const keyE = `${filterRes[0]} ${filterRes[3]}` // 过滤后的问题+选项C作为关键词

        Promise.all([
          new Search(keyA),
          new Search(keyB),
          new Search(keyC),
          new Search(keyD),
          new Search(keyE)
        ]).then((searchRes) => {
          new Rule(searchRes, this.options).then((ruleRes) => {
            resolve(ruleRes)
          })
        }).catch(() => {})

      }).catch(() => {})
    })
  }
}

module.exports = Ai
