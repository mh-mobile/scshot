const {
  Command,
  puppeteer,
  terminalImage,
  FileUtil,
  PageUtil
} = require('./command.js')

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

    // ユーザー固有のGithubのページにアクセス
    await page.goto(this.url)
    await page.waitForSelector(this.targetSelector)
    await page.setViewport({
      width: 800,
      height: await page.evaluate(() => document.body.clientHeight)
    })

    // Graph画像の位置を算出
    const clip = await PageUtil.getElementClientRect(page, this.targetSelector)
    const tempfilePath = FileUtil.getTempfilePath('graph.png')

    // Graph画像を一時ディレクトリに保存
    await page.screenshot({ clip, path: tempfilePath })
    browser.close()

    // ターミナルで画像を表示
    console.log(
      await terminalImage.file(tempfilePath, { width: '70%', height: '70%' })
    )
  }
}
module.exports = GithubCommand
