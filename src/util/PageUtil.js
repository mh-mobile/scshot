const terminalImage = require('terminal-image')
const FileUtil = require('./FileUitl.js')

class PageUtil {
  static getElementClientRect(page, targetSelector) {
    return page.evaluate((selector) => {
      const graphElm = document.querySelector(selector)
      const {
        width,
        height,
        top: y,
        left: x
      } = graphElm.getBoundingClientRect()
      return { width: width, height: height, x: x, y: y }
    }, targetSelector)
  }

  static async takeScreenshotSelector(page, targetSelector, savedFilename) {
    await page.waitForSelector(targetSelector)
    const clip = await PageUtil.getElementClientRect(page, targetSelector)

    const tempfilePath = FileUtil.getTempfilePath(savedFilename)

    // Graph画像を一時ディレクトリに保存
    await page.screenshot({ clip, path: tempfilePath })

    // ターミナルで画像を表示
    console.log(
      await terminalImage.file(tempfilePath, { width: '70%', height: '70%' })
    )
  }

  static async getLink(page, targetSelector) {
    return page.evaluate((selector) => {
      return document.querySelector(selector).href
    }, targetSelector)
  }
}

module.exports = PageUtil
