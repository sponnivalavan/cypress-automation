import LoginPage from '../support/pages/login-page'
import MenuPage from '../support/pages/menu-page'
import EnvironmentsPage from '../support/pages/environments-page'
import InfrastructurePage from "../support/pages/infrastructure-page";
import ApplicationsPage from "../support/pages/applications-page";
import DeployApplicationPage from "../support/pages/deploy-applications-page";
import ReportsPage from "../support/pages/reports-page";
import { report } from 'process';

const loginPage = new LoginPage()
const menuPage = new MenuPage()
const environmentsPage = new EnvironmentsPage()
const infrastructurePage = new InfrastructurePage()
const applicationsPage = new ApplicationsPage()
const deployApplicationPage = new DeployApplicationPage()
const reportsPage = new ReportsPage()

describe('Maintenance Release Suite', () => {
   /* it('Deployment of applications', () => {
        loginPage.login('http://localhost:4516/', 'admin', 'admin')

        //Create Localhost Windows Infrastructure
        var infrastructureName = infrastructurePage.createInfrastructure()
        cy.log("Infrastructure Name:" + infrastructureName)

        //Create Environment with the infrastrucutre created
        var environmentName = environmentsPage.createEnvironment(infrastructureName)
        cy.log("Environment Name:" + environmentName)

        //Create Application
        var applicationName = applicationsPage.createApplication()
        cy.log("Application Name:" + applicationName)

        //Deploy Application
        //var applicationName = "imkmf"
        //var environmentName = "yuqsx"
        deployApplicationPage.deployApplication(applicationName, environmentName)
        deployApplicationPage.undeployApplication(applicationName, environmentName)

    }) */



  /*  it('Create user, assign role to user and give permissions', () => {
        loginPage.login('http://localhost:4516/', 'admin', 'admin')
        menuPage.navigateToExplorer()
        menuPage.navigateToUserManagement()
        var userName = userManagementPage.addUser()
        userManagementPage.navigateToRoles()
        var roleName = userManagementPage.addRoleToUser(userName)
        userManagementPage.navigateToPermissions()
        userManagementPage.assignPermissionsToRole(roleName)
    })*/

    it('Reports', () => {
        loginPage.login('http://localhost:4516/', 'admin', 'admin')
        menuPage.navigateToExplorer()
        menuPage.navigateToReports()
        reportsPage.navigateToDeployment()
        reportsPage.clickSearch()
        reportsPage.clickInitial()
        reportsPage.clickRollback()
        reportsPage.clickUndeploy()
        reportsPage.clickUpgrade()
})
})