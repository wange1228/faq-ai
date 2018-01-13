const axios = require('axios')
const config = require('./config')

class Bang {
  constructor(text, pattern = 'all', format = 'json') {
    this.text = encodeURIComponent(text)
    this.pattern = pattern
    this.format = format

    return this.main()
  }

  main() {
    const url = `http://api.ltp-cloud.com/analysis/?api_key=${Bang.API_KEY}&text=${this.text}&pattern=${this.pattern}&format=${this.format}`
    return axios.get(url)
  }
}


Bang.API_KEY = config.BANG_API_KEY

module.exports = Bang
