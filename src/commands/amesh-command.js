const {
  Command,
  puppeteer,
  terminalImage,
  delay,
  FileUtil,
  PageUtil
} = require('./command.js')

class AmeshCommand extends Command {
  constructor() {
    super()
    this.targetSelector = '.meshMapArea-wrapper'
    this.url = 'https://tokyo-ame.jwa.or.jp/index.html'
  }

  execute() {
    ;(async () => {
      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()

      // ユーザー固有のGithubのページにアクセス
      await page.goto(this.url)
      await page.waitForSelector(this.targetSelector)

      // 画像のロード読み込みのためdelayさせる
      delay(3000)

      await page.setViewport({
        width: 800,
        height: await page.evaluate(() => document.body.clientHeight)
      })

      // Graph画像の位置を算出
      const clip = await PageUtil.getElementClientRect(
        page,
        this.targetSelector
      )
      const tempfilePath = FileUtil.getTempfilePath('amesh.png')

      // Graph画像を一時ディレクトリに保存
      await page.screenshot({ clip, path: tempfilePath })
      browser.close()

      // ターミナルで画像を表示
      console.log(
        await terminalImage.file(tempfilePath, { width: '70%', height: '70%' })
      )
    })()
  }
}

module.exports = AmeshCommand
