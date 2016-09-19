import 'babel-polyfill'
import BPromise from 'bluebird'
import wd from 'wd'
import {assert} from 'chai'

const caps = {
  browserName: 'Safari',
  platformName: 'iOS',
  deviceName: process.env.DEVICE_NAME || "iPhone",
  captureScreenshots: true,
  newCommandTimeout: 90000
}
const appium_local = {
  host: 'localhost',
  port: 4723
}
const my_local = {
  host: 'localhost',
  auth: 'phuong:fa8f2c29-e66d-44bf-912a-0ac49b3a0104',
  port: 3000
}
const server = my_local
const testUrl = 'http://demoqa.com/'
const loopCount = process.env.RUN_LOOP || 1
const TEST_CASE = 'Input name into textfield'

console.log(`Using capabilities: ${JSON.stringify(caps)}`)

describe(`Running \"${TEST_CASE}\" test with ${loopCount} time(s) on 1 device - ${new Date().toString()}`, () => {
  let i = 0
  let itIdx = 0

  beforeEach(async () => {
    itIdx++
    console.log(`\n[${itIdx}/${loopCount}] Begin - ${new Date().toString()}`)
  })

  for (i = 0; i < loopCount; i++) {
    it(`${TEST_CASE}`, async () => {
      const browser = wd.promiseChainRemote(server)

      try {
        await browser.init(caps)
      }
      catch (e) {
        console.error(e)
        assert(false, 'The environment you requested was unavailable.')
      }

      try {
        await browser
          .get(`${testUrl}contact/`)
          .waitForElementByXPath("//input[@name='your-name']")
          .sendKeys('phuongle')
          .quit()
      }
      catch (e) {
        console.error(e)
        assert(false, 'Could not finish test script.')
      }
    })
  }

  afterEach(() => {
    console.log(`[${itIdx}/${loopCount}] Ended - ${new Date().toString()}`)
  })

  after(() => {
    console.log(`  Finished - ${new Date().toString()}`)
  })
})
