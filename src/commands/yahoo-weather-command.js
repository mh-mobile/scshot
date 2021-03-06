const { Command, puppeteer, PageUtil } = require('./command.js')

class YahooWeatherCommand extends Command {
  constructor (searchWord) {
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

  async execute () {
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()

    await page.goto(this.url)
    await page.setViewport({
      width: 800,
      height: await page.evaluate(() => document.body.clientHeight)
    })

    try {
      const link = await PageUtil.getLink(page, this.searchTableSelector)
      await page.goto(link)
    } catch (e) {
      console.log(e.message)
      process.exit(-1)
    }

    const screenshotPromises = this.targetSelectors.map((targetSelector) => {
      return PageUtil.takeScreenshotSelector.bind(
        null,
        page,
        targetSelector,
        'yahoo-wether.png'
      )
    })

    for (const screenshotPromise of screenshotPromises) {
      await screenshotPromise()
    }
    browser.close()
  }
}

module.exports = YahooWeatherCommand
