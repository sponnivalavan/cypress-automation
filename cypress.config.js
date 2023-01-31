const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1200,
  viewportHeight: 660,

  e2e: {
    experimentalStudio: true,
    defaultCommandTimeout: 25000,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      "configFile": "reporter-config.json"
    },
  }


})