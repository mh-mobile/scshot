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
}

module.exports = PageUtil
