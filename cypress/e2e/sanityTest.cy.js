import LoginModule from '../support/modules/loginModule'
import LoginPage from '../support/pages/loginPage'
import CIExplorerSidebarModule from '../support/modules/ciExplorerSidebarModule'
import CIExplorerSidebarPage from '../support/pages/ciExplorerSidebarPage'
import SettingsModule from "../support/modules/settingsModule";
import SettingsPage from "../support/pages/settingsPage"
import UserManagementModule from "../support/modules/userManagementModule";
import UserManagementPage from "../support/pages/userManagementPage";
import ReportsModule from "../support/modules/reportsModule";
import ReportsPage from "../support/pages/reportsPage";
import ApplicationsModule from "../support/modules/applicationsModule";
import ApplicationsPage from "../support/pages/applicationsPage";
import MonitoringModule from "../support/modules/monitoringModule";
import MonitoringPage from "../support/pages/monitoringPage";
import EnvironmentsModule from '../support/modules/environmentsModule'
import EnvironmentsPage from '../support/pages/environmentsPage'
import InfrastructureModule from "../support/modules/infrastructureModule";
import InfrastructurePage from "../support/pages/infrastructurePage";
import DeployApplicationModule from "../support/modules/deployApplicationModule";
import DeployApplicationPage from "../support/pages/deployApplicationsPage";
import 'cypress-file-upload';

const loginModule = new LoginModule()
const loginPage = new LoginPage()
const ciExplorerSideBarModule = new CIExplorerSidebarModule()
const ciExplorerSidebarPage = new CIExplorerSidebarPage()
const settingsModule = new SettingsModule()
const settingsPage = new SettingsPage()
const userManagementModule = new UserManagementModule()
const userManagementPage = new UserManagementPage()
const reportsModule = new ReportsModule()
const reportsPage = new ReportsPage()
const appModule = new ApplicationsModule()
const appPage = new ApplicationsPage()
const monitoringModule = new MonitoringModule()
const monitoringPage = new MonitoringPage()
const envModule = new EnvironmentsModule()
const envPage = new EnvironmentsPage()
const infraModule = new InfrastructureModule()
const infraPage = new InfrastructurePage()
const deployApplicationModule = new DeployApplicationModule()
const deployApplicationPage = new DeployApplicationPage()

describe('Maintenance Release Suite', () => {

    beforeEach(() => {
        //Login to application
        loginModule.login('http://localhost:4516/', 'admin', 'admin')
    })

    it('TC: 1 - Verify login screen customization with message', () => {
        //Navigate to Settings page and add login screen message
        ciExplorerSideBarModule.navigateToSettings()
        settingsModule.addLoginScreenMessage("Test")
        loginModule.logout()
        cy.get('.auth-message').contains("Test")
    })

    it('TC: 2 - XLD-Deployment:Verify that admin user can not delete admin user', () => {
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        cy.get('table tbody tr').filter(':has(td:nth-child(1):contains("admin"))')
            .filter(':has(td:nth-child(2):contains("Edit"))').and('not.include.text', "Delete").and('include.text', "Edit")
    })

    it('TC: 3 - Verify is stitch section is displayed', () => {
        ciExplorerSideBarModule.navigateToExplorer()
        cy.get(ciExplorerSidebarPage.titleStitch).contains('Stitch')
        cy.get(ciExplorerSidebarPage.listRulesandMacros).contains('Rules and Macros')
        cy.get(ciExplorerSidebarPage.listGitOps).contains('GitOps')
        cy.get(ciExplorerSidebarPage.listLocalSources).contains('Local sources')
    })

    it('TC: 4 - XLD-Validate settings tab for deploy', () => {
        //Navigate to Settings
        ciExplorerSideBarModule.navigateToSettings()

        //Change Header color
        cy.get(settingsPage.textColor).click()
        cy.get(settingsPage.selectColor).click()

        //Add Instance Name and verify its available in top left side
        cy.get(settingsPage.inputInstanceName).clear().type("xlr_prod")
        cy.get(settingsPage.buttonSave).contains('Save').click()
        cy.get(settingsPage.labelHeader).contains('xlr_prod')
    })

    it('TC: 5 - Verify Logo file is displayed in settings tab', () => {
        //Navigate to Settings page, check save button disabled and digital ai image logo displayed
        ciExplorerSideBarModule.navigateToSettings()
        cy.get(settingsPage.buttonSave).contains('Save').should('be.disabled')
        cy.get('div').find('img').should('have.attr', 'src').should('include', 'ciExplorerDist/libs/images/deploy-logo-5506ebfd2a8b504f81b5ba636d1746ca.svg')

        //New logo file to be uploaded and displayed
        const filepath = 'cypress/fixtures/test1.jpg'
        settingsModule.uploadLogoFile(filepath)
        settingsModule.clearLogoFile()
    })

    it('TC: 6 - Verify Features is present in settings tab', () => {
        //Navigate to User Management
        ciExplorerSideBarModule.navigateToSettings()
        ciExplorerSideBarModule.navigateToFeatures()
        cy.wait(3000)
        cy.get(settingsPage.checkAnalyticsGuidance).uncheck().should('not.be.checked');
        cy.get(settingsPage.checkAllowUsersOptOut).check().should('be.checked');
        cy.get(settingsPage.buttonFeaturesSave).contains('Save').click({force: true})
        cy.wait(3000)
        cy.get(loginPage.buttonAvatar).click({force: true})
        cy.get(settingsPage.linkUserProfile).click({force: true})
        cy.get(settingsPage.titleProductAnalyticsGuidance).contains('Product analytics and guidance')
        cy.get(settingsPage.checkUserProfileAnalyticsGuidance).should('be.checked');
    })

    it('TC: 7 - Verify list displayed in settings icons perform actions as expected', () => {
        //List under settings is displayed as expected
        cy.get(ciExplorerSidebarPage.iconSettings).click({force: true});
        cy.get(settingsPage.menuSettings).contains('Settings')
        cy.get(settingsPage.menuSettingsRenewLicense).contains('Renew license')
        cy.get(settingsPage.menuSettingsViewAs).contains('View as')
        cy.get(settingsPage.menuSettingsMaintenanceMode).contains('Maintenance mode')
        cy.get(settingsPage.menuSettingsAbout).contains('About')
        cy.get(settingsPage.menuSettingsSysInfo).contains('System information')

        //About and system information displays as expected
        cy.get(settingsPage.linkAbout).click({force: true})
        cy.window().then(function (p) {
            cy.get(settingsPage.titleAbout).contains('About')
            cy.get(settingsPage.textServerVersion).contains('Server version:')
            cy.get(settingsPage.iconCloseAboutWindow).click({force: true})
        })

        cy.get(ciExplorerSidebarPage.iconSettings).click({force: true});
        cy.get(settingsPage.menuSettingsSysInfo).click({force: true})
        cy.window().then(function (p) {
            cy.get(settingsPage.titleSysInfo).contains('System information')
            cy.get(settingsPage.textSysInfo).contains('Deploy system information')
            cy.get(settingsPage.iconCloseAboutWindow).click({force: true})
        })

        //Check help link and docs page working
        cy.get(settingsPage.iconHelp).click({force: true});
        cy.get(settingsPage.linkOnlineDoc).should('have.attr', 'href', 'https://docs.xebialabs.com')
    })

    it('TC: 8 - XLD-Verify that User with deploy_admin_read_only role shall have view permission for XLD', () => {
        //Create User, Role, Assign Role to user and give deploy permissions
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        var userName = userManagementModule.addUser()
        userManagementModule.navigateToRoles()
        userManagementModule.assigndeployAdminReadRoleToUser(userName)

        //Logout and login as non admin user
        loginModule.logout()
        var password = userName + "U1"
        loginModule.login('http://localhost:4516/', userName, password)
        cy.get(settingsPage.iconClosePendo).click({force: true});
        cy.wait(5000)

        var checkAppPermissions = appModule.checkAppPermissions()

        //re-login as admin and unassign the permissions
        loginModule.logout()
        loginModule.login('http://localhost:4516/', 'admin', 'admin')
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.navigateToRoles()
        userManagementModule.unassigndeployAdminReadRoleToUser()
    })

    it.skip('TC: 9 - Verify if plugins can be installed', () => {
        //Navigate to User Management
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToPlugins()
        cy.wait(3000)
        cy.get(ciExplorerSidebarPage.buttonPluginsInstall).click({force: true})
        cy.wait(3000)
    })

    it('TC: 10 - XLD-Applications:Create CMD application package and ' +
        'TC: 11 - XLD-Deployment:Update deployment and verify the task', () => {
        //Create Localhost Windows Infrastructure
        var infraName = infraModule.createInfra()
        cy.log("Infrastructure Name:" + infraName)

        //Create Environment with the infrastrucutre created
        var envName = envModule.createEnv(infraName)

        //Create Application
        var appName = appModule.createApp()
        var appDepPkgName = appModule.createAppDepPkg(appName)
        var cmd1 = "systeminfo"
        var appCmdExe = appModule.createAppCmdExe(appName, appDepPkgName, cmd1)

        var appDepPkgUpgradeName = appModule.createAppDepPkgUpgrade(appName)
        var cmd2 = "dir"
        var appCmdExeForUpgrade = appModule.createAppCmdExeForUpgrade(appName, appDepPkgUpgradeName, cmd2)

        //Rollback Application
        deployApplicationModule.rollbackApplication(appName, envName, appDepPkgName)

        //Deploy Application
        deployApplicationModule.deployApplication(appName, envName, appDepPkgName)

        //Upgrade Application
        deployApplicationModule.upgradeApplication(appName, envName, appDepPkgUpgradeName)

        //Undeploy Application
        deployApplicationModule.undeployApplication(appName, envName)
    })

    //Case 6 not working.
    it.skip('TC: 6 - XLD-Monitoring_control all task should display only tasks with permission', () => {
        //Create User, Role, Assign Role to user and give deploy permissions
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        var userName = userManagementModule.addUser()
        userManagementModule.navigateToRoles()
        var roleName = userManagementModule.addRoleToUser(userName)

        //give local permissions for infra, environment and application.
        cy.wait(3000)
        ciExplorerSideBarModule.navigateToExplorerFromUserManagement()
        infraModule.assignInfraPermissionsToRole(roleName)
        envModule.assignEnvPermissionsToRole(roleName)
        envModule.assignAppPermissionsToRole(roleName)

        //give global permissions for login and report view
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.navigateToPermissions()
        userManagementModule.assignLoginAndReportPermissionsToRole(roleName)

        //Navigate to infrastructure and create a new directory 'test'.
        ciExplorerSideBarModule.navigateToExplorerFromUserManagement()
        cy.wait(3000)
        var infraDirName = infraModule.createInfraDirectory()
        cy.log("Infrastructure Name:" + infraDirName)
        infraModule.navigateToInfraDirectory(infraDirName)

        //Give permissions to the user for the directory
        //userManagementPage.assignInfraDirPerToRole(roleName)

        //Create a new infrastructure globally.
        var infraName = infraModule.createInfra()

        //Create a new infrastructure inside the directory.
        var localInfraName = infraModule.createInfraInsideDirectory(infraDirName)

        //Execute control task for global infra
        infraModule.executeControlTask(infraName)

        //Logout and login as created user to xld
        loginModule.logout()
        var password = userName + "U1"
        loginModule.login('http://localhost:4516/', userName, password)
        cy.wait(3000)
        //cy.wait(5000)
        cy.get('._pendo-close-guide').click({force: true});
        cy.wait(5000)

        //Execute task for test local infra
        infraModule.executeControlTaskLocalInfra(infraDirName, localInfraName)

        //Control task(all) in monitoring section should display only task executed by tester
        ciExplorerSideBarModule.navigateToMonitoring()
        ciExplorerSideBarModule.navigateToMonitoringControlTasks()

        //cy.get('.task-selected > .tasks-table-owner > .with-popup-content').contains(userName)
        cy.get('td.tasks-table-state > span:nth-child(1)').contains('Executed')
    })

    it('TC: 12 - XLD-Monitoring:Verify  "Type" filter functionality for Deployment tasks in Monitoring tab', () => {
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToReports()
        reportsModule.navigateToDeployments()
        reportsModule.filterInitialDeployment()
        cy.wait(3000)
        cy.get(reportsPage.tblDeploymentStatus).contains('Initial')
        reportsModule.filterRollbackDeployment()
        cy.wait(3000)
        cy.get(reportsPage.tblDeploymentStatus).contains('Rollback')
        reportsModule.filterUndeployDeployment()
        cy.wait(3000)
        cy.get(reportsPage.tblDeploymentStatus).contains('Undeploy')
        reportsModule.filterUpgradeDeployment()
        cy.wait(3000)
        cy.get(reportsPage.tblDeploymentStatus).contains('Update')
    })

    it('TC: 13 - XLD-Reports:Verify schedule of a control task(Rescan Artifact)', () => {
        //Create Application
        var appName = appModule.createApp()
        var appDepPkgName = appModule.createAppDepPkg(appName)
        const filepath = 'cypress/fixtures/file1.txt'
        var fileName = appModule.createAppFile(appName, appDepPkgName, filepath)

        //Rescan Artifact
        appModule.rescanArtifact(appName, appDepPkgName, fileName)

        //Navigate to control tasks and finish the tasks.
        ciExplorerSideBarModule.navigateToMonitoring()
        ciExplorerSideBarModule.navigateToMonitoringControlTasks()
        monitoringModule.executeControlTasks(appName, appDepPkgName, fileName)
    })

    it('TC: 14 - Deploy an application from non admin user' +
        'TC: 15 - XLD-Verify password strength criteria in GUI' +
        'TC: 16 - XLD-User-Management:Create user, assign role and various permissions to user', () => {
        //Create User, Role, Assign Role to user and give deploy permissions
        cy.wait(3000)
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        var userName = userManagementModule.addUser()
        userManagementModule.navigateToRoles()
        var roleName = userManagementModule.addRoleToUser(userName)

        //give local permissions for infra, environment and application.
        cy.wait(3000)
        ciExplorerSideBarModule.navigateToExplorerFromUserManagement()
        infraModule.assignInfraPermissionsToRole(roleName)
        envModule.assignEnvPermissionsToRole(roleName)
        appModule.assignAppPermissionsToRole(roleName)

        //give global permissions
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.navigateToPermissions()
        userManagementModule.assignPermissionsToRole(roleName)

        //Logout and login as non admin user
        loginModule.logout()
        var password = userName + "U1"
        loginModule.login('http://localhost:4516/', userName, password)
        cy.wait(3000)
        cy.get('._pendo-close-guide').click({force: true});
        cy.wait(5000)

        //Create app, infra, environment and Deploy Applications
        var infraName = infraModule.createInfra()
        cy.log("Infrastructure Name:" + infraName)

        //Create Environment with the infrastrucutre created
        var envName = envModule.createEnv(infraName)
        cy.log("Environment Name:" + envName)

        //Create Application
        var appName = appModule.createApp()
        var appDepPkgName = appModule.createAppDepPkg(appName)
        var cmd1 = "systeminfo"
        var appCmdExe = appModule.createAppCmdExe(appName, appDepPkgName, cmd1)

        //Deploy Application
        deployApplicationModule.deployApplication(appName, envName, appDepPkgName)
    })
})