const puppeteer = require('puppeteer')
const delay = require('delay')
const PageUtil = require('../util/PageUtil.js')

class Command {
  execute () {
    throw new Error('implemnet this method')
  }
}

module.exports = {
  Command,
  puppeteer,
  delay,
  PageUtil
}
