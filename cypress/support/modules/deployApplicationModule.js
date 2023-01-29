import DeployApplicationPage from '../pages/deployApplicationsPage'
import ApplicationsPage from "../pages/applicationsPage";
import EnvironmentsPage from "../pages/environmentsPage";

const deployApplicationPage = new DeployApplicationPage()
const applicationsPage = new ApplicationsPage()
const environmentsPage = new EnvironmentsPage()

export default class DeployApplicationModule {

    deployApplication(appName, environmentName, appDepPkgName) {
        cy.viewport(1400, 700)
        cy.get(applicationsPage.getIconApplication(), {timeout: 10000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '"', {timeout: 10000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '/' + appDepPkgName + '"', {timeout: 10000}).click({force: true})
        cy.viewport(1400, 700)
        deployApplicationPage.getButtonDeploy().click()
        cy.wait(10000)
        cy.get('input[value="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        deployApplicationPage.getButton().contains('Continue').click({force: true})
        cy.viewport(1400, 700)
        cy.wait(8000)
        deployApplicationPage.getButtonDeployAll().click({force: true})
        cy.wait(8000)
        deployApplicationPage.getButton().contains('Finish').click({force: true})
    }

    rollbackApplication(appName, environmentName, appDepPkgName) {
        cy.viewport(1400, 700)
        cy.get(applicationsPage.getIconApplication(), {timeout: 10000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '"', {timeout: 10000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '/' + appDepPkgName + '"', {timeout: 10000}).click({force: true})
        cy.viewport(1400, 700)
        deployApplicationPage.getButtonDeploy().click()
        cy.wait(5000)
        cy.get('input[value="Environments/' + environmentName + '"').click({force: true});
        deployApplicationPage.getButton().contains('Continue').click({force: true})
        cy.viewport(1400, 700)
        cy.wait(5000)
        deployApplicationPage.getButtonDeployAll().click({force: true})
        cy.wait(5000)
        deployApplicationPage.getButton().contains('Rollback').click({force: true})
        cy.wait(5000)
        deployApplicationPage.getButton().contains('Yes').click({force: true})
        cy.wait(5000)
        deployApplicationPage.getButton().contains('Finish').click({force: true})
    }

    upgradeApplication(appName, envName, appDepPkgNameUpgrade) {
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '/' + appDepPkgNameUpgrade + '"', {timeout: 10000}).click({force: true});
        cy.viewport(1400, 700)
        deployApplicationPage.getButtonDeployAll().click({force: true})
        cy.wait(10000)
        cy.get('input[value="Environments/' + envName + '"', {timeout: 10000}).click({force: true});
        deployApplicationPage.getButton().contains('Continue').click({force: true})
        cy.viewport(1400, 700)
        cy.wait(5000)
        deployApplicationPage.getButtonDeployAll().click({force: true})
        cy.wait(5000)
        deployApplicationPage.getButton().contains('Finish').click({force: true})
    }

    undeployApplication(applicationName, environmentName) {
        cy.viewport(1400, 700)
        environmentsPage.getIconEnvironments().click({force: true});
        environmentsPage.getSelectEnvironmentTree().click({force: true});
        cy.wait(5000)
        cy.get('i[data-id="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        environmentsPage.getSelectEnvironmentTree().click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Environments/' + environmentName + '/' + applicationName + '"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        deployApplicationPage.getButtonUnDeploy().click({force: true})
        cy.wait(5000)
        deployApplicationPage.getButton().contains('Undeploy').click({force: true})
        cy.wait(5000)
        deployApplicationPage.getButton().contains('Finish').click({force: true})
    }
}