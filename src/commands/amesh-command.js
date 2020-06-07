const { Command, puppeteer, delay, PageUtil } = require('./command.js')

class AmeshCommand extends Command {
  constructor() {
    super()
    this.targetSelector = '.meshMapArea-wrapper'
    this.url = 'https://tokyo-ame.jwa.or.jp/index.html'
  }

  async execute() {
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()

    await page.goto(this.url)
    await page.waitForSelector(this.targetSelector)

    // Ameshの画像読み込みのためdelayさせる
    delay(3000)

    await page.setViewport({
      width: 800,
      height: await page.evaluate(() => document.body.clientHeight)
    })

    await PageUtil.takeScreenshotSelector(
      page,
      this.targetSelector,
      'amesh.png'
    )
    browser.close()
  }
}

module.exports = AmeshCommand
