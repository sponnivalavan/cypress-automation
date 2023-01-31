export default class MonitoringPage {
    getButtonFinish() {
        return cy.get('button[type=button]')
    }

    getButtonExecute() {
        return cy.get('.execute')
    }

    getLinkTableCtrlTasks() {
        return cy.get('div.xl-react-widget-table:nth-child(3) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)')
    }
}