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
        const keyContact = filterRes[1].concat(filterRes[2]).concat(filterRes[3]) // 合并关键词
        const keyDistinct = [...new Set(keyContact)] // 关键词去重

        const includeA = Search.includeKeyword(filterRes[1])
        const includeB = Search.includeKeyword(filterRes[2])
        const includeC = Search.includeKeyword(filterRes[3])

        const excludeBC = Search.excludeKeyword(Filter.arrCompare(keyDistinct, filterRes[1]))
        const excludeAC = Search.excludeKeyword(Filter.arrCompare(keyDistinct, filterRes[2]))
        const excludeAB = Search.excludeKeyword(Filter.arrCompare(keyDistinct, filterRes[3]))

        const keyA = this.question // 原提问作为长尾关键词
        const keyB = Search.includeKeyword(filterRes[0]) // 过滤后的问题作为关键词
        const keyC = `${keyB} ${includeA} ${excludeBC}` // 过滤后的问题+选项A作为关键词
        const keyD = `${keyB} ${includeB} ${excludeAC}` // 过滤后的问题+选项B作为关键词
        const keyE = `${keyB} ${includeC} ${excludeAB}` // 过滤后的问题+选项C作为关键词

        Promise.all([
          new Search(keyA),
          new Search(keyB),
          new Search(keyC),
          new Search(keyD),
          new Search(keyE)
        ]).then((searchRes) => {
          new Rule(searchRes, [filterRes[1], filterRes[2], filterRes[3]])
            .then((ruleRes) => {
              resolve(ruleRes)
            })
        }).catch((err) => {
          // console.log(err)
        })

      }).catch((err) => {
        // console.log(err)
      })
    })
  }
}

module.exports = Ai
