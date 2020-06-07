const { Command, puppeteer, PageUtil } = require('./command.js')

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
      return PageUtil.screenshotSelector.bind(
        null,
        page,
        targetSelector,
        'yahoo-wether.png'
      )
    })

    for (const promise of promises) {
      await promise()
    }
    browser.close()
  }
}

module.exports = YahooWeatherCommand
