import LoginPage from '../support/pages/loginPage'
import CIExplorerSidebarPage from '../support/pages/ciExplorerSidebarPage'
import EnvironmentsPage from '../support/pages/environmentsPage'
import InfrastructurePage from "../support/pages/infrastructurePage";
import ApplicationsPage from "../support/pages/applicationsPage";
import DeployApplicationPage from "../support/pages/deployApplicationsPage";
import SettingsPage from "../support/pages/settingsPage";
import UserManagementPage from "../support/pages/userManagementPage";
import 'cypress-file-upload';
import ReportsPage from "../support/pages/reportsPage";
import MonitoringPage from "../support/pages/monitoringPage";

const loginPage = new LoginPage()
const menuPage = new CIExplorerSidebarPage()
const envPage = new EnvironmentsPage()
const infraPage = new InfrastructurePage()
const appPage = new ApplicationsPage()
const deployApplicationPage = new DeployApplicationPage()
const ciexpSideBarPage = new CIExplorerSidebarPage()
const settingsPage = new SettingsPage()
const userManagementPage = new UserManagementPage()
const reportsPage = new ReportsPage()
const monitoringPage = new MonitoringPage()

describe('Maintenance Release Suite', () => {

    beforeEach(() => {
        //Login to application
        loginPage.login('http://localhost:4516/', 'admin', 'admin')
    })

    it('TC: 1 - Verify login screen customization with message', () => {
        //Navigate to Settings page and add login screen message
        ciexpSideBarPage.navigateToSettings()
        settingsPage.addLoginScreenMessage("Test")
        loginPage.logout()
        cy.get('.auth-message').contains("Test")
    })

    it('TC: 2 - XLD-Deployment:Verify that admin user can not delete admin user', () => {
        ciexpSideBarPage.navigateToExplorer()
        ciexpSideBarPage.navigateToUserManagement()
        cy.get('table tbody tr').filter(':has(td:nth-child(1):contains("admin"))')
            .filter(':has(td:nth-child(2):contains("Edit"))').and('not.include.text', "Delete").and('include.text', "Edit")
    })

    it('TC: 3 - Verify is stitch section is displayed', () => {
        ciexpSideBarPage.navigateToExplorer()
        cy.get('h6.MuiTypography-root').contains('Stitch')
        cy.get('li.MuiButtonBase-root:nth-child(5) > span:nth-child(1) > p:nth-child(2)').contains('Rules and Macros')
        cy.get('li.MuiButtonBase-root:nth-child(6) > span:nth-child(1) > p:nth-child(2)').contains('GitOps')
        cy.get('li.MuiButtonBase-root:nth-child(7) > span:nth-child(1) > p:nth-child(2)').contains('Local sources')
    })

    it('TC: 4 - XLD-Validate settings tab for deploy', () => {
        //Navigate to Settings
        ciexpSideBarPage.navigateToSettings()

        //Change Header color
        cy.get('.color-swatch').click()
        cy.get('div.color-swatch:nth-child(4)').click()

        //Add Instance Name and verify its available in top left side
        cy.get('input[name=instanceName]').clear().type("xlr_prod")
        cy.get('button[type=button]').contains('Save').click()
        cy.get('div.instance-name:nth-child(1) > label:nth-child(1)').contains('xlr_prod')
    })

    it('TC: 5 - Verify Logo file is displayed in settings tab', () => {
        //Navigate to Settings page, check save button disabled and digital ai image logo displayed
        ciexpSideBarPage.navigateToSettings()
        cy.get('.save').should('be.disabled')
        cy.get('div').find('img').should('have.attr', 'src').should('include', 'ciExplorerDist/libs/images/deploy-logo-5506ebfd2a8b504f81b5ba636d1746ca.svg')

        //New logo file to be uploaded and displayed
        const filepath = 'cypress/fixtures/test1.jpg'
        settingsPage.uploadLogoFile(filepath)
        settingsPage.clearLogoFile()
    })

    it('TC: 6 - Verify Features is present in settings tab', () => {
        //Navigate to User Management
        ciexpSideBarPage.navigateToSettings()
        ciexpSideBarPage.navigateToFeatures()
        cy.wait(3000)
        cy.get('div.xl-react-dip-dynamic-form-element:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)').uncheck().should('not.be.checked');
        cy.get('div.xl-react-dip-dynamic-form-element:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)').check().should('be.checked');
        cy.get('.features-container > div:nth-child(2) > button:nth-child(1)').contains('Save').click({force: true})
        cy.wait(3000)
        cy.get('span.dot-typography').click({force: true})
        cy.get('.userProfile > span:nth-child(2)').click({force: true})
        cy.get('.pendo-header-title').contains('Product analytics and guidance')
        cy.get('div.xl-react-components-input:nth-child(4) > input:nth-child(1)').should('be.checked');
    })

    it('TC: 7 - Verify list displayed in settings icons perform actions as expected', () => {
        //List under settings is displayed as expected
        cy.get('.icon-settings').click({force: true});
        cy.get('.settings > span:nth-child(2)').contains('Settings')
        cy.get('.renewLicense > span:nth-child(2)').contains('Renew license')
        cy.get('.viewAs > span:nth-child(2)').contains('View as')
        cy.get('.maintenanceMode > span:nth-child(2)').contains('Maintenance mode')
        cy.get('.about > span:nth-child(2)').contains('About')
        cy.get('.systemInformation > span:nth-child(2)').contains('System information')

        //About and system information displays as expected
        cy.get('.about > span:nth-child(2)').click({force: true})
        cy.window().then(function (p) {
            cy.get('span.title:nth-child(1)').contains('About')
            cy.get('.server-version').contains('Server version:')
            cy.get('i.close-icon:nth-child(1)').click({force: true})
        });

        cy.get('.icon-settings').click({force: true});
        cy.get('.systemInformation > span:nth-child(2)').click({force: true})
        cy.window().then(function (p) {
            cy.get('span.title:nth-child(1)').contains('System information')
            cy.get('.statistics-title > h3:nth-child(1)').contains('Deploy system information')
            cy.get('i.close-icon:nth-child(1)').click({force: true})
        });

        //Check help link and docs page working
        cy.get('.icon-help').click({force: true});
        cy.get('.onlineDocumentation').should('have.attr', 'href', 'https://docs.xebialabs.com')
    })

    it('TC: 8 - XLD-Verify that User with deploy_admin_read_only role shall have view permission for XLD', () => {
        //Create User, Role, Assign Role to user and give deploy permissions
        cy.wait(3000)
        menuPage.navigateToExplorer()
        menuPage.navigateToUserManagement()
        var userName = userManagementPage.addUser()
        userManagementPage.navigateToRoles()
        userManagementPage.assigndeployAdminReadRoleToUser(userName)

        //Logout and login as non admin user
        loginPage.logout()
        var password = userName + "U1"
        loginPage.login('http://localhost:4516/', userName, password)
        cy.get('._pendo-close-guide').click({force: true});
        cy.wait(5000)

        var checkAppPermissions = appPage.checkAppPermissions()

        //re-login as admin and unassign the permissions
        loginPage.logout()
        loginPage.login('http://localhost:4516/', 'admin', 'admin')
        menuPage.navigateToExplorer()
        menuPage.navigateToUserManagement()
        userManagementPage.navigateToRoles()
        userManagementPage.unassigndeployAdminReadRoleToUser()
    })

    it.skip('TC: 9 - Verify if plugins can be installed', () => {
        //Navigate to User Management
        ciexpSideBarPage.navigateToExplorer()
        ciexpSideBarPage.navigateToPlugins()
        cy.wait(3000)
        cy.get('div.PluginList__tile___2jNVB:nth-child(2) > div:nth-child(1) > button:nth-child(2)').click({force: true})
        cy.wait(3000)
    })

    it('TC: 10 - XLD-Applications:Create CMD application package and ' +
        'TC: 11 - XLD-Deployment:Update deployment and verify the task', () => {
        //Create Localhost Windows Infrastructure
        var infraName = infraPage.createInfra()
        cy.log("Infrastructure Name:" + infraName)

        //Create Environment with the infrastrucutre created
        var envName = envPage.createEnv(infraName)

        //Create Application
        var appName = appPage.createApp()
        var appDepPkgName = appPage.createAppDepPkg(appName)
        var cmd1 = "systeminfo"
        var appCmdExe = appPage.createAppCmdExe(appName, appDepPkgName, cmd1)

        var appDepPkgUpgradeName = appPage.createAppDepPkgUpgrade(appName)
        var cmd2 = "dir"
        var appCmdExeForUpgrade = appPage.createAppCmdExeForUpgrade(appName, appDepPkgUpgradeName, cmd2)

        //Rollback Application
        deployApplicationPage.rollbackApplication(appName, envName, appDepPkgName)

        //Deploy Application
        deployApplicationPage.deployApplication(appName, envName, appDepPkgName)

        //Upgrade Application
        deployApplicationPage.upgradeApplication(appName, envName, appDepPkgUpgradeName)

        //Undeploy Application
        deployApplicationPage.undeployApplication(appName, envName)
    })

    //Case 6 not working.
    it.skip('TC: 6 - XLD-Monitoring_control all task should display only tasks with permission', () => {
        //Create User, Role, Assign Role to user and give deploy permissions
        menuPage.navigateToExplorer()
        menuPage.navigateToUserManagement()
        var userName = userManagementPage.addUser()
        userManagementPage.navigateToRoles()
        var roleName = userManagementPage.addRoleToUser(userName)

        //give local permissions for infra, environment and application.
        cy.wait(3000)
        menuPage.navigateToExplorerFromUserManagement()
        infraPage.assignInfraPermissionsToRole(roleName)
        envPage.assignEnvPermissionsToRole(roleName)
        appPage.assignAppPermissionsToRole(roleName)

        //give global permissions for login and report view
        menuPage.navigateToUserManagement()
        userManagementPage.navigateToPermissions()
        userManagementPage.assignLoginAndReportPermissionsToRole(roleName)

        //Navigate to infrastructure and create a new directory 'test'.
        menuPage.navigateToExplorerFromUserManagement()
        cy.wait(3000)
        var infraDirName = infraPage.createInfraDirectory()
        cy.log("Infrastructure Name:" + infraDirName)
        infraPage.navigateToInfraDirectory(infraDirName)

        //Give permissions to the user for the directory
        //userManagementPage.assignInfraDirPerToRole(roleName)

        //Create a new infrastructure globally.
        var infraName = infraPage.createInfra()

        //Create a new infrastructure inside the directory.
        var localInfraName = infraPage.createInfraInsideDirectory(infraDirName)

        //Execute control task for global infra
        infraPage.executeControlTask(infraName)

        //Logout and login as created user to xld
        loginPage.logout()
        var password = userName + "U1"
        loginPage.login('http://localhost:4516/', userName, password)
        cy.wait(3000)
        //cy.wait(5000)
        cy.get('._pendo-close-guide').click({force: true});
        cy.wait(5000)

        //Execute task for test local infra
        infraPage.executeControlTaskLocalInfra(infraDirName, localInfraName)

        //Control task(all) in monitoring section should display only task executed by tester
        menuPage.navigateToMonitoring()
        menuPage.navigateToMonitoringControlTasks()

        //cy.get('.task-selected > .tasks-table-owner > .with-popup-content').contains(userName)
        cy.get('td.tasks-table-state > span:nth-child(1)').contains('Executed')
    })

    it('TC: 12 - XLD-Monitoring:Verify  "Type" filter functionality for Deployment tasks in Monitoring tab', () => {
        ciexpSideBarPage.navigateToExplorer()
        ciexpSideBarPage.navigateToReports()
        reportsPage.navigateToDeployments()
        reportsPage.filterInitialDeployment()
        cy.wait(3000)
        cy.get(':nth-child(1) > .report-table-type > .with-popup-content').contains('Initial')
        reportsPage.filterRollbackDeployment()
        cy.wait(3000)
        cy.get(':nth-child(1) > .report-table-type > .with-popup-content').contains('Rollback')
        reportsPage.filterUndeployDeployment()
        cy.wait(3000)
        cy.get(':nth-child(1) > .report-table-type > .with-popup-content').contains('Undeploy')
        reportsPage.filterUpgradeDeployment()
        cy.wait(3000)
        cy.get(':nth-child(1) > .report-table-type > .with-popup-content').contains('Update')
    })

    it('TC: 13 - XLD-Reports:Verify schedule of a control task(Rescan Artifact)', () => {
        //Create Application
        var appName = appPage.createApp()
        var appDepPkgName = appPage.createAppDepPkg(appName)
        const filepath = 'cypress/fixtures/file1.txt'
        var fileName = appPage.createAppFile(appName, appDepPkgName, filepath)

        //Rescan Artifact
        appPage.rescanArtifact(appName, appDepPkgName, fileName)

        //Navigate to control tasks and finish the tasks.
        menuPage.navigateToMonitoring()
        menuPage.navigateToMonitoringControlTasks()
        monitoringPage.executeControlTasks(appName, appDepPkgName, fileName)
    })

    it('TC: 14 - Deploy an application from non admin user' +
        'TC: 15 - XLD-Verify password strength criteria in GUI' +
        'TC: 16 - XLD-User-Management:Create user, assign role and various permissions to user', () => {
        //Create User, Role, Assign Role to user and give deploy permissions
        cy.wait(3000)
        menuPage.navigateToExplorer()
        menuPage.navigateToUserManagement()
        var userName = userManagementPage.addUser()
        userManagementPage.navigateToRoles()
        var roleName = userManagementPage.addRoleToUser(userName)

        //give local permissions for infra, environment and application.
        cy.wait(3000)
        menuPage.navigateToExplorerFromUserManagement()
        infraPage.assignInfraPermissionsToRole(roleName)
        envPage.assignEnvPermissionsToRole(roleName)
        appPage.assignAppPermissionsToRole(roleName)

        //give global permissions
        menuPage.navigateToUserManagement()
        userManagementPage.navigateToPermissions()
        userManagementPage.assignPermissionsToRole(roleName)

        //Logout and login as non admin user
        loginPage.logout()
        var password = userName + "U1"
        loginPage.login('http://localhost:4516/', userName, password)
        cy.wait(3000)
        cy.get('._pendo-close-guide').click({force: true});
        cy.wait(5000)

        //Create app, infra, environment and Deploy Applications
        var infraName = infraPage.createInfra()
        cy.log("Infrastructure Name:" + infraName)

        //Create Environment with the infrastrucutre created
        var envName = envPage.createEnv(infraName)
        cy.log("Environment Name:" + envName)

        //Create Application
        var appName = appPage.createApp()
        var appDepPkgName = appPage.createAppDepPkg(appName)
        var cmd1 = "systeminfo"
        var appCmdExe = appPage.createAppCmdExe(appName, appDepPkgName, cmd1)

        //Deploy Application
        deployApplicationPage.deployApplication(appName, envName, appDepPkgName)
    })

})