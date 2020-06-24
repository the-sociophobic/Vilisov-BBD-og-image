const express = require('express')
const crypto = require('crypto')
const os = require('os')
const fs = require('fs')
const util = require('util')

const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const { get } = require('http')
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
// const chromePathUbuntu = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const app = express()
const port = 3000

const promiseWriteFile = util.promisify(fs.writeFile)


const writeFile2 = async (fileName, html) => {
  const hashedFileName = crypto.createHash("md5")
    .update(fileName)
    .digest("hex") + ".html"

  const filePath = os.tmpdir() + hashedFileName
  
  await promiseWriteFile(filePath, html)

  return `file://${filePath}`
}



getOptions = async isDev => {
  let options

  if (isDev)
    options = {
      args: [],
      executiblePath: chromePath,
      headless: true,
    }
  else
    options = {
      args: chrome.args,
      executiblePath: await chrome.executiblePath,
      headless: chrome.headless,
    }

  return options
}

const getScreenshot = async (url, isDev) => {
  // const browser = await puppeteer.launch(await getOptions(isDev))
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({
    width: 1200,
    height: 630,
  })

  await page.goto(url)

  return page.screenshot({type: "png", quality: 100})
}



app.get('/*', async (req, res) => {
  const fileUrl = await writeFile2("a", `<img src="https://sun9-53.userapi.com/c855032/v855032066/234251/DKU1YJ9UibI.jpg"></img>`)
  const file = await getScreenshot(fileUrl, true)
  console.log(file)

  res.send('Hello World!')
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))