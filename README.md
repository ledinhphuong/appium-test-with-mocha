# auto-test
Automation test script using ES6, Babel 6, Mocha and Istanbul

## Requirements
```bash
node: ^6.3.0
npm: ^3.10.3
appium: ^1.5.3
ios-webkit-debug-proxy: ^1.8
```

## Run appium locally
* iOS:
```bash
ios_webkit_debug_proxy -c <your-udid>:27753 -d
appium --command-timeout "7200" --debug-log-spacing --default-capabilities '{"udid":"your-udid", "showIOSLog":true, "platformName":"iOS", "nativeInstrumentsLib":true, "automationName":"XCUITest"}' --default-device --log-timestamp
```
* Android:
```bash
appium --command-timeout "7200" --debug-log-spacing --default-capabilities '{"platformName":"Android"}' --default-device --log-timestamp
```

## Commands
```bash
npm install
npm run ios-safari
```

## Troubleshootings
* Missing JAVA_HOME
* Missing ANDROID_HOME
