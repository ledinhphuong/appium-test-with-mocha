import 'babel-polyfill'
import 'colors'
import BPromise from 'bluebird'
import wd from 'wd'
import {assert} from 'chai'
import {exec} from 'child_process'
import {Cloud, AppiumServer} from './environment'

const iosCaps = {
  browserName: 'Safari',
  platformName: 'iOS',
  deviceName: process.env.NAME || "iPhone 6s",
  // Use with AppiumServer
  // udid: 'xxx',
  captureScreenshots: false
}

const caps = iosCaps
const server = AppiumServer
const testUrl = 'http://the-internet.herokuapp.com/login'
const loopCount = process.env.LOOP || 1
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
      browser.on('status', (info) => {console.log(info.cyan)})
      browser.on('command', (meth, path, data) => {
        console.log('> ' + meth.yellow, path.grey, data || '')
      })
      browser.on('http', (meth, path, data) => {
        console.log('> ' + meth.magenta, path, (data || '').grey)
      })

      try {
        await browser.init(caps)
      }
      catch (e) {
        console.error(e)
        assert(false, 'The environment you requested was unavailable.')
      }

      try {
        await browser
          .get(`${testUrl}`)
          .waitForElementById('username')
          .sendKeys('foo')
          .waitForElementById('password')
          .sendKeys('SuperSecretPassword!')
          .waitForElementByXPath("//form[@name='login']")
          .submit()
          .quit()
      }
      catch (e) {
        console.error(e)
        assert(false, 'Could not finish test script.')
      }
    })
  }

  afterEach(async () => {
    console.log(`[${itIdx}/${loopCount}] Ended - ${new Date().toString()}`)
  })

  after(() => {
    console.log(`  Finished - ${new Date().toString()}`)
  })
})
