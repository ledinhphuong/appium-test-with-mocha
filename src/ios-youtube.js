import 'babel-polyfill'
import 'colors'
import BPromise from 'bluebird'
import wd from 'wd'
import {assert} from 'chai'
import {exec} from 'child_process'
import {Cloud, LocalHost, AppiumServer} from './environment'

const iosCaps = {
  platformName: 'iOS',
  deviceName: process.env.NAME || "iPhone 6",
  udid: '8748d2bee70b9693a6fac194758abb7d370430fc',
  bundleId: 'com.google.ios.youtube'
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
      const driver = wd.promiseChainRemote(server)
      driver.on('status', (info) => {console.log(info.cyan)})
      driver.on('command', (meth, path, data) => {
        console.log('> ' + meth.yellow, path.grey, data || '')
      })
      driver.on('http', (meth, path, data) => {
        console.log('> ' + meth.magenta, path, (data || '').grey)
      })

      try {
        await driver.init(caps)
      }
      catch (e) {
        console.error(e)
        assert(false, 'The environment you requested was unavailable.')
      }

      try {
        await driver
          .waitForElementByXPath("//*[@name='id.ui.navigation.search.button']")
          .click()
          .sleep(5000)
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
