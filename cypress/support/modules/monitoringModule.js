import MonitoringPage from "../pages/monitoringPage";

const monitoringPage = new MonitoringPage()
export default class MonitoringModule {
    executeControlTasks(appName, appDepPkgName, fileName) {
        monitoringPage.getLinkTableCtrlTasks().dblclick()
        cy.wait(5000)
        monitoringPage.getButtonExecute().click({force: true})
        cy.wait(5000)
        monitoringPage.getButtonFinish().contains('Finish').click({force: true});
        cy.wait(5000)
    }
}