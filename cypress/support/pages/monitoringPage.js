import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class MonitoringPage {
    executeControlTasks(appName, appDepPkgName, fileName) {
        cy.get('div.xl-react-widget-table:nth-child(3) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)').dblclick()
        cy.wait(5000)
        cy.get('.execute').click({force: true})
        cy.wait(5000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
        cy.wait(5000)
    }}