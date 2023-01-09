import DeployApplicationPage from '../pages/deployApplicationsPage'
import ApplicationsPage from "../pages/applicationsPage";
import EnvironmentsPage from "../pages/environmentsPage";

const deployApplicationPage = new DeployApplicationPage()
const applicationsPage = new ApplicationsPage()
const environmentsPage = new EnvironmentsPage()

export default class DeployApplicationModule {

    deployApplication(appName, environmentName, appDepPkgName) {
        cy.viewport(1400, 700)
        cy.get(applicationsPage.iconApplication , {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + "/" + appName + '"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + "/" + appName + '/' + appDepPkgName + '"', {timeout: 10000}).click({force: true});
        cy.viewport(1400, 700)
        cy.get(deployApplicationPage.buttonDeploy).click()
        cy.wait(10000)
        cy.get('input[value="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get(deployApplicationPage.button).contains('Continue').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(8000)
        cy.get(deployApplicationPage.buttonDeployAll).click({force: true})
        cy.wait(8000)
        cy.get(deployApplicationPage.button).contains('Finish').click({force: true});
    }

    rollbackApplication(appName, environmentName, appDepPkgName) {
        cy.viewport(1400, 700)
        cy.get(applicationsPage.iconApplication, {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + "/" + appName + '"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + "/" + appName + '/' + appDepPkgName + '"', {timeout: 10000}).click({force: true});
        cy.viewport(1400, 700)
        cy.get(deployApplicationPage.buttonDeploy).click()
        cy.wait(10000)
        cy.get('input[value="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get(deployApplicationPage.button).contains('Continue').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(8000)
        cy.get(deployApplicationPage.buttonDeployAll).click({force: true})
        cy.wait(8000)
        cy.get(deployApplicationPage.button).contains('Rollback').click({force: true});
        cy.wait(8000)
        cy.get(deployApplicationPage.button).contains('Yes').click({force: true});
        cy.wait(8000)
        cy.get(deployApplicationPage.button).contains('Finish').click({force: true});
    }

    upgradeApplication(appName, envName, appDepPkgNameUpgrade) {
        cy.get(applicationsPage.iconApplication + "/" + appName + '/' + appDepPkgNameUpgrade + '"', {timeout: 10000}).click({force: true});
        cy.viewport(1400, 700)
        cy.get(deployApplicationPage.buttonDeploy).click()
        cy.wait(10000)
        cy.get('input[value="Environments/' + envName + '"', {timeout: 10000}).click({force: true});
        cy.get(deployApplicationPage.button).contains('Continue').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(8000)
        cy.get(deployApplicationPage.buttonDeployAll).click({force: true})
        cy.wait(8000)
        cy.get(deployApplicationPage.button).contains('Finish').click({force: true});
    }

    undeployApplication(applicationName, environmentName) {
        cy.viewport(1400, 700)
        cy.get(environmentsPage.iconEnvironments, {timeout: 10000}).click({force: true});
        cy.get(environmentsPage.selectEnvironmentTree).click({force: true});
        cy.wait(5000)
        cy.get('i[data-id="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get(environmentsPage.selectEnvironmentTree).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Environments/' + environmentName + '/' + applicationName + '"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get(deployApplicationPage.buttonUndeploy, {timeout: 10000}).click({force: true});
        cy.wait(5000)
        cy.get(deployApplicationPage.button).contains('Undeploy').click({force: true});
        cy.wait(8000)
        cy.get(deployApplicationPage.button).contains('Finish').click({force: true});
    }
}