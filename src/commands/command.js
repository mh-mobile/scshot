const puppeteer = require('puppeteer')
const terminalImage = require('terminal-image')
const delay = require('delay')
const FileUtil = require('../util/FileUitl.js')
const PageUtil = require('../util/PageUtil.js')

class Command {
  execute() {
    throw new Error('implemnet this method')
  }
}

module.exports = {
  Command,
  puppeteer,
  terminalImage,
  delay,
  FileUtil,
  PageUtil
}
