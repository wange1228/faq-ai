const express = require('express')
const bodyParser = require('body-parser')
const Ai = require('./ai')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 允许所有的请求形式
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/faq-ai', function(req, res) {
  const question = req.body.question
  const options = [req.body.optionA, req.body.optionB, req.body.optionC]

  return new Ai(question, options).then((aiRes) => {
    let total = 0
    aiRes.forEach((val) => {
      total = total + val
    })
    const rateA = (aiRes[0] / total * 100).toFixed(2) + '%'
    const rateB = (aiRes[1] / total * 100).toFixed(2) + '%'
    const rateC = (aiRes[2] / total * 100).toFixed(2) + '%'
    const output = {
      ret: 0,
      data: [rateA, rateB, rateC]
    }
    console.log(output)
    res.end(JSON.stringify(output))
  }).catch((err) => {
    res.end(JSON.stringify({
      ret: 1,
      data: []
    }))
  })
})

app.listen(8080)
