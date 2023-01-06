const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = (on, config) => {
    require('cypress-mochawesome-reporter/plugin')(on);
};