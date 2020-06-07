const {
  Command,
  puppeteer,
  terminalImage,
  FileUtil,
  PageUtil
} = require('./command.js')

class YahooWeatherCommand extends Command {
  constructor(searchWord) {
    super()
    this.searchWord = searchWord
    this.searchTableSelector = '.serch-table a'
    this.targetSelectors = [
      '#yjw_pinpoint_today',
      '#yjw_pinpoint_tomorrow',
      '#yjw_week'
    ]
    this.url = `https://weather.yahoo.co.jp/weather/search/?p=${encodeURIComponent(
      this.searchWord
    )}`
  }

  async execute() {
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()

    // ユーザー固有のGithubのページにアクセス
    await page.goto(this.url)
    await page.setViewport({
      width: 800,
      height: await page.evaluate(() => document.body.clientHeight)
    })

    const link = await page.evaluate((selector) => {
      return document.querySelector(selector).href
    }, this.searchTableSelector)

    await page.goto(link)

    const promises = this.targetSelectors.map((targetSelector) => {
      return this.screenshotSelector.bind(null, page, targetSelector)
    })

    for (const promise of promises) {
      await promise()
    }
    browser.close()
  }

  async screenshotSelector(page, targetSelector) {
    await page.waitForSelector(targetSelector)
    const clip = await PageUtil.getElementClientRect(page, targetSelector)

    const tempfilePath = FileUtil.getTempfilePath('yahoo-wether.png')

    // Graph画像を一時ディレクトリに保存
    await page.screenshot({ clip, path: tempfilePath })

    // ターミナルで画像を表示
    console.log(
      await terminalImage.file(tempfilePath, { width: '70%', height: '70%' })
    )
  }
}

module.exports = YahooWeatherCommand
