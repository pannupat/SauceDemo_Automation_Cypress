const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
        testIsolation: true,
    blockHosts: ['*.backtrace.io','events.backtrace.io'], // กัน 401 telemetry รบกวน
    retries: { runMode: 2, openMode: 0 },                 // เหมาะกับ CI
    video: true
  }
})
