import LoginPage from '../support/pages/loginPage'
import CIExplorerSidebarPage from '../support/pages/ciExplorerSidebarPage'
import EnvironmentsPage from '../support/pages/environmentsPage'
import InfrastructurePage from "../support/pages/infrastructurePage";
import ApplicationsPage from "../support/pages/applicationsPage.js";
import DeployApplicationPage from "../support/pages/deployApplicationsPage";

const loginPage = new LoginPage()
const menuPage = new CIExplorerSidebarPage()
const envPage = new EnvironmentsPage()
const infraPage = new InfrastructurePage()
const appPage = new ApplicationsPage()
const deployApplicationPage = new DeployApplicationPage()

describe('Maintenance Release Suite', () => {
    it('Deployment of applications', () => {
        /*//Login to application
        loginPage.login('http://localhost:4516/', 'admin', 'admin')

        //Create Localhost Windows Infrastructure
        var infraName = infraPage.createInfra()
        cy.log("Infrastructure Name:" + infraName)

        //Create Environment with the infrastrucutre created
        var envName = envPage.createEnv(infraName)
        cy.log("Environment Name:" + envName)

        //Create Application
        var appName = appPage.createApp()
        var appDepPkgName = appPage.createAppDepPkg(appName)
        var cmd1 = "systeminfo"
        var appCmdExe = appPage.createAppCmdExe(appName, appDepPkgName,cmd1)

        //Deploy Application
        deployApplicationPage.deployApplication(appName, envName)
        deployApplicationPage.undeployApplication(appName, envName)*/

    })
})