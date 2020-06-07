const { program } = require('commander')

class ScshotCLI {
  run(argv) {
    try {
      program
        .name('scshot')
        .usage('[command]')
        .command('github [username]', 'fetch github grapph')
        .command('yahoo-weather [keyword]', 'search weather with query')
        .command('amesh', 'fetch amesh')
        .parse(argv)
    } catch (e) {
      console.log(`${e}`)
    }
  }
}

new ScshotCLI().run(process.argv)

// function github() {
//   ;(async () => {
//     const browser = await puppeteer.launch({
//       headless: true
//     })
//     const page = await browser.newPage()

//     // ユーザー固有のGithubのページにアクセス
//     await page.goto(`https://github.com/users/${userName}/contributions`)
//     await page.waitForSelector('.js-calendar-graph')
//     await page.setViewport({
//       width: 800,
//       height: await page.evaluate(() => document.body.clientHeight)
//     })

//     // Graph画像の位置を算出
//     const clip = await page.evaluate(() => {
//       const graphElm = document.querySelector('.js-calendar-graph')
//       const {
//         width,
//         height,
//         top: y,
//         left: x
//       } = graphElm.getBoundingClientRect()
//       return { width: width, height: height, x: x, y: y }
//     })

//     const tempPath = path.join(os.tmpdir(), 'graph.jpg')

//     // Graph画像を一時ディレクトリに保存
//     await page.screenshot({ clip, path: tempPath })
//     browser.close()

//     // ターミナルで画像を表示
//     console.log(
//       await terminalImage.file(tempPath, { width: '70%', height: '70%' })
//     )
//   })()
// }

// function screenshotYahooWeathe(searchWord) {
//   ;(async () => {
//     const browser = await puppeteer.launch({
//       headless: false
//     })
//     const page = await browser.newPage()

//     // ユーザー固有のGithubのページにアクセス
//     await page.goto(
//       `https://weather.yahoo.co.jp/weather/search/?p=${encodeURIComponent(
//         searchWord
//       )}`
//     )
//     await page.setViewport({
//       width: 800,
//       height: await page.evaluate(() => document.body.clientHeight)
//     })

//     const link = await page.evaluate(() => {
//       return document.querySelector('.serch-table a').href
//     })

//     await page.goto(link)

//     const targetSelectors = [
//       '#yjw_pinpoint_today',
//       '#yjw_pinpoint_tomorrow',
//       '#yjw_week'
//     ]

//     async function screenshotSelector(targetSelector) {
//       await page.waitForSelector(targetSelectors)
//       const clip = await page.evaluate((selector) => {
//         const graphElm = document.querySelector(selector)
//         const {
//           width,
//           height,
//           top: y,
//           left: x
//         } = graphElm.getBoundingClientRect()
//         return { width: width, height: height, x: x, y: y }
//       }, targetSelector)

//       const tempPath = path.join(os.tmpdir(), 'graph.jpg')

//       // Graph画像を一時ディレクトリに保存
//       await page.screenshot({ clip, path: tempPath })

//       // ターミナルで画像を表示
//       console.log(
//         await terminalImage.file(tempPath, { width: '70%', height: '70%' })
//       )
//     }

//     const promises = targetSelectors.map((targetSelector) => {
//       return screenshotSelector.bind(null, targetSelector)
//     })

//     for (const promise of promises) {
//       await promise()
//     }
//     browser.close()
//   })()
// }

// function amesh() {
//   ;(async () => {
//     const browser = await puppeteer.launch({
//       headless: true
//     })
//     const page = await browser.newPage()

//     // ユーザー固有のGithubのページにアクセス
//     await page.goto('https://tokyo-ame.jwa.or.jp/index.html')
//     await page.waitForSelector('.meshMapArea-wrapper')

//     // 画像のロード読み込みのためdelayさせる
//     delay(3000)

//     await page.setViewport({
//       width: 800,
//       height: await page.evaluate(() => document.body.clientHeight)
//     })

//     // Graph画像の位置を算出
//     const clip = await page.evaluate(() => {
//       const graphElm = document.querySelector('.meshMapArea-wrapper')
//       const {
//         width,
//         height,
//         top: y,
//         left: x
//       } = graphElm.getBoundingClientRect()
//       return { width: width, height: height, x: x, y: y }
//     })

//     const tempPath = path.join(os.tmpdir(), 'graph.jpg')

//     // Graph画像を一時ディレクトリに保存
//     await page.screenshot({ clip, path: tempPath })
//     browser.close()

//     // ターミナルで画像を表示
//     console.log(
//       await terminalImage.file(tempPath, { width: '70%', height: '70%' })
//     )
//   })()
// }

// // github()

// // screenshotYahooWeathe('神奈川県横浜市鶴見区')

// amesh()
