import MonitoringPage from "../pages/monitoringPage";

const monitoringPage = new MonitoringPage()
export default class MonitoringModule {
    executeControlTasks(appName, appDepPkgName, fileName) {
        cy.get(monitoringPage.tblLinkCtrlTasks).dblclick()
        cy.wait(5000)
        cy.get(monitoringPage.buttonExecute).click({force: true})
        cy.wait(5000)
        cy.get(monitoringPage.buttonFinish).contains('Finish').click({force: true});
        cy.wait(5000)
    }
}