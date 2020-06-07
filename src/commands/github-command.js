const { Command, puppeteer, PageUtil } = require('./command.js')

class GithubCommand extends Command {
  constructor(userName) {
    super()
    this.userName = userName
    this.targetSelector = '.js-calendar-graph'
    this.url = `https://github.com/users/${this.userName}/contributions`
  }

  async execute() {
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()

    await page.goto(this.url)
    await page.waitForSelector(this.targetSelector)
    await page.setViewport({
      width: 800,
      height: await page.evaluate(() => document.body.clientHeight)
    })

    await PageUtil.screenshotSelector(
      page,
      this.targetSelector,
      'github-grass.png'
    )
    browser.close()
  }
}
module.exports = GithubCommand
