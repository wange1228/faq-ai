<template>
  <div style="font-size: 20px">
    <button @click="handleStartListening">{{ isListening ? '停止' : '开始' }}</button>
    <div>{{ problem }}</div>
    <ul>
      <li v-for="(item, index) in options" :key="index">{{ item }}</li>
    </ul>
    <br/>
    <h2>答案</h2>
    <ul>
      <li v-for="(item, index) in answers" :key="index">{{ options[index] }} : {{item}}</li>
    </ul>
  </div>
</template>

<script>
  import runtime from '../api/runtime.js'
  const url = 'http://htpmsg.jiecaojingxuan.com/msg/current'

  export default {
    name: 'app',
    data () {
      return {
        isListening: false,
        loop: null,
        problem: '',
        options: [],
        answers: [],
        tmpProblem: ''
      }
    },
    methods: {
      handleStartListening () {
        this.isListening = !this.isListening
  
        if (this.isListening) {
          this.loop = setInterval(() => {
            this.queryQuestion().then(res => {
              if (res.data && res.data.event) {
                let { desc, options } = res.data.event || {}

                options = typeof options === 'string' ? (JSON.parse(options) || []) : (options || [])
                this.problem = desc || ''
                this.options = options
                if (this.problem !== this.tmpProblem) {
                  this.queryFaqAi({
                    question: this.problem.replace(/\d+./, ''),
                    optionA: options[0],
                    optionB: options[1],
                    optionC: options[2]
                  }).then(res => {
                    if (res && res.data) {
                      // runtime.sendMessage({
                      //   type: 'answer'
                      // })
                      this.answers = res.data || []
                    } else {
                      this.answers = []
                    }
                  })
                  this.tmpProblem = this.problem
                }
                runtime.sendMessage({
                  type: 'search',
                  params: {
                    problem: desc.replace(/\d+\./, ''),
                    options
                  }
                })
              }
            }).catch(e => {
              this.problem = 'network problem'
              this.options = []
            })
          }, 1000)
        } else {
          clearInterval(this.loop)
        }
      },
      queryQuestion () {
        return new Promise((resolve, reject) => {
          fetch(url).then(res => {
            if (res.ok) {
              let json = res.json()
              if (json) {
                resolve(json)
              } else {
                reject(json)
              }
            } else {
              reject(res)
            }
          })
        })
      },
      queryFaqAi (data) {
        return new Promise((resolve, reject) => {
          fetch('http://10.107.96.122:8080/faq-ai', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
            if (res.ok) {
              let json = res.json()
              if (json) {
                resolve(json)
              } else {
                reject(json)
              }
            } else {
              reject(res)
            }
          })
        })
      }
    }
  }
  </script>
