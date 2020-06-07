const { Command, puppeteer, PageUtil } = require('./command.js')

class GithubGrassCommand extends Command {
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

    const response = await page.goto(this.url)
    if (response.status() === 404) {
      console.log(`given user [${this.userName}] not found`)
      process.exit(-1)
    }
    await page.waitForSelector(this.targetSelector)
    await page.setViewport({
      width: 800,
      height: await page.evaluate(() => document.body.clientHeight)
    })

    await PageUtil.takeScreenshotSelector(
      page,
      this.targetSelector,
      'github-grass.png'
    )
    browser.close()
  }
}
module.exports = GithubGrassCommand
