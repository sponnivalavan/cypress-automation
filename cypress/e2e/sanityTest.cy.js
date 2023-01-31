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

describe('Maintenance Release Test Suite', () => {

    beforeEach(() => {
        // Login to application
        loginModule.login(Cypress.env('hostname'), Cypress.env('username'), Cypress.env('password'))
    })

    it('Verify login screen customization with message', () => {
        // Verify the login page does not display any message by default
        loginPage.getAuthMessage().should('not.exist');

        // Navigate to Settings page and add login screen message
        ciExplorerSideBarModule.navigateToSettings()
        settingsModule.addLoginScreenMessage('welcome to digital.ai')

        // Logout of the application and on login screen verify if the message is displayed
        loginModule.logout()
        loginPage.getAuthMessage().contains('welcome to digital.ai')

        // Login as admin and remove the message and verify if the message does not appear in login screen
        loginModule.login(Cypress.env('hostname'), Cypress.env('username'), Cypress.env('password'))
        ciExplorerSideBarModule.navigateToSettings()
        settingsModule.removeLoginScreenMessage()
        loginModule.logout()
        loginPage.getAuthMessage().should('not.exist');
    })

    it('Verify that admin user can not delete admin user', () => {
        // Go to user management option and see that no delete option for admin user
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        ciExplorerSidebarPage.getAdminUserNoDeleteOption()
    })

    it('Verify is stitch section is displayed', () => {
        ciExplorerSideBarModule.navigateToExplorer()
        // Verify if stitch available by admin in default
        ciExplorerSidebarPage.getTitleStitch().contains('Stitch')

        // Verify rules and macros is available
        ciExplorerSidebarPage.getListGitOps().contains('GitOps')

        // Verify if Local sources is available
        ciExplorerSidebarPage.getListLocalSources().contains('Local sources')

        // Verify if gitops is available
        ciExplorerSidebarPage.getListRulesAndMacros().contains('Rules and Macros')
    })

    it('Validate settings tab for deploy', () => {
        //Navigate to Settings
        ciExplorerSideBarModule.navigateToSettings()

        // Change the header color to different colors
        settingsPage.getTextColor().click()
        settingsPage.getSelectColor().click()

        // Provide a Instance Name e.g. xld_prod and hit save
        settingsPage.getInputInstanceName().clear().type("xlr_prod")
        settingsPage.getButton().contains('Save').click()
        settingsPage.getLabelHeader().contains('xlr_prod')
    })

    it('Verify Logo file is displayed in settings tab', () => {
        //Navigate to Settings page, check save button disabled and digital ai image logo displayed
        ciExplorerSideBarModule.navigateToSettings()
        settingsPage.getButton().contains('Save').should('be.disabled')
        settingsPage.getLogoImage()

        //New logo file to be uploaded and displayed
        const filepath = 'cypress/fixtures/test1.jpg'
        settingsModule.uploadLogoFile(filepath)
        settingsModule.clearLogoFile()
    })

    it('Verify Features is present in settings tab', () => {
        //Navigate to Settings and verify Features tab available
        ciExplorerSideBarModule.navigateToSettings()
        ciExplorerSideBarModule.navigateToFeatures()

        // Verify Analytics and guidance is enabled by default.
        settingsPage.getCheckAnalyticsGuidance().uncheck().should('not.be.checked')
    })

    it('Verify Pendo toggle for user profile', () => {
        //Navigate to Settings and verify Features tab available
        ciExplorerSideBarModule.navigateToSettings()
        ciExplorerSideBarModule.navigateToFeatures()

        // Verify Allow users to opt-out option is available and disabled by default
        settingsPage.getCheckAllowUsersOptOut().check().should('be.checked')
        settingsPage.getButtonFeaturesSave().click()
        cy.wait(3000)

        //Verify help link near product analytics and guidance takes to documentation page of xl-deploy on click.
        loginPage.getAvatarButton().click()
        settingsPage.getLinkUserProfile().click()
        settingsPage.getTitleProductAnalyticsGuidance().contains('Product analytics and guidance')
        settingsPage.getCheckProfileAnalyticsGuidance().should('be.checked')
    })

    it('Verify list displayed in settings icons perform actions as expected', () => {
        // Click on settings in top right corner and verify below list is displayed
        ciExplorerSidebarPage.getIconSettings().click()
        settingsPage.getMenuSettings().contains('Settings')
        settingsPage.getMenuSettingsRenewLicense().contains('Renew license')
        settingsPage.getMenuSettingsViewAs().contains('View as')
        settingsPage.getMenuSettingsMaintenanceMode().contains('Maintenance mode')
        settingsPage.getMenuSettingsAbout().contains('About')
        settingsPage.getMenuSettingsSysInfo().contains('System information')

        // Verify if about and system information displays information as expected
        settingsPage.getLinkAbout().click()
        cy.window().then(function (p) {
            settingsPage.getTitleAbout().contains('About')
            settingsPage.getTextServerVersion().contains('Server version:')
            settingsPage.getIconCloseAboutWindow().click()
        })
        ciExplorerSidebarPage.getIconSettings().click()
        settingsPage.getMenuSettingsSysInfo().click()
        cy.window().then(function (p) {
            settingsPage.getTitleSysInfo().contains('System information')
            settingsPage.getTextSysInfo().contains('Deploy system information')
            settingsPage.getIconCloseAboutWindow().click()
        })

        //Check help link and docs page working
        settingsPage.getIconHelp().click()
        settingsPage.getLinkOnlineDoc().should('have.attr', 'href', 'https://docs.xebialabs.com')
    })

    it('Verify password strength criteria in GUI', () => {
        // Login as admin and navigate to user management and create new user
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        var userName = userManagementModule.addUser()
        userManagementModule.navigateToRoles()
        var roleName = userManagementModule.addRoleToUser(userName)

        //give global permissions for login and report view
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.navigateToPermissions()
        userManagementModule.assignLoginAndReportPermissionsToRole(roleName)

        // Logout and login as created user
        loginModule.logout()
        var password = userName + "U1"
        console.log("password:" + password)
        loginModule.login(Cypress.env('hostname'), userName, password)

        // Login as admin and change password to the user
        loginModule.logout()
        loginModule.login(Cypress.env('hostname'), Cypress.env('username'), Cypress.env('password'))
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.changePassword(userName)

        // Verify user is able to login to GUI with new password
        loginModule.logout()
        var password = userName + "P2"
        loginModule.login(Cypress.env('hostname'), userName, password)
    })

    it('Verify that User with deploy_admin_read_only role shall have view permission for XLD', () => {
        //Create User, Role, Assign Role to user and give deploy permissions
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        var userName = userManagementModule.addUser()
        userManagementModule.navigateToRoles()
        userManagementModule.assigndeployAdminReadRoleToUser(userName)

        //Logout and login as non admin user
        loginModule.logout()
        var password = userName + "U1"
        loginModule.login(Cypress.env('hostname'), userName, password)
        settingsPage.getIconClosePendo().click()
        cy.wait(5000)

        var checkAppPermissions = appModule.checkAppPermissions()

        //re-login as admin and unassign the permissions
        loginModule.logout()
        loginModule.login(Cypress.env('hostname'), Cypress.env('username'), Cypress.env('password'))
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.navigateToRoles()
        userManagementModule.unassigndeployAdminReadRoleToUser()
    })

    it('Applications:Create CMD application package', () => {
        // Create new application
        var appName = appModule.createApp()

        // Create new deployment package inside the above created application
        var appDepPkgName = appModule.createAppDepPkg(appName)

        // Create new multiple cmd type applications inside package
        var cmd1 = "systeminfo"
        var appCmdExe = appModule.createAppCmdExe(appName, appDepPkgName, cmd1)
        var cmd2 = "dir"
        var appCmdExe = appModule.createAppCmdExe(appName, appDepPkgName, cmd2)
    })

    it('Deployment:Update deployment and verify the task', () => {
        // Create localhost in infrastructure ci
        var infraName = infraModule.createInfra()

        // Create an environment for above created localhost
        var envName = envModule.createEnv(infraName)

        // Create application package of cmd type
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

    it('Monitoring_control all task should display only tasks with permission', () => {
        // Create User, Role, Assign Role to user
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        var userName = userManagementModule.addUser()
        userManagementModule.navigateToRoles()
        var roleName = userManagementModule.addRoleToUser(userName)

        //Give local permissions for infra, environment and application.
        cy.wait(3000)
        ciExplorerSideBarModule.navigateToExplorerFromUserManagement()
        infraModule.assignInfraPermissionsToRole(roleName)
        envModule.assignEnvPermissionsToRole(roleName)
        appModule.assignAppPermissionsToRole(roleName)

        // Give global permissions for login and report view
        ciExplorerSideBarModule.navigateToExplorer()
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
        //serManagementModule.assignInfraDirPerToRole(roleName)

        //Create a new infrastructure inside the directory.
        var localInfraName = infraModule.createInfraInsideDirectory(infraDirName)

        //Create a new infrastructure globally.
        var infraName = infraModule.createInfra()

        //Execute control task for global infra
        infraModule.executeControlTask(infraName)

        //Logout and login as created user to xld
        loginModule.logout()
        cy.wait(5000)
        var password = userName + "U1"
        loginModule.login(Cypress.env('hostname'), userName, password)
        cy.wait(3000)
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

    it('Monitoring:Verify  "Type" filter functionality for Deployment tasks in Monitoring tab', () => {
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToReports()
        reportsModule.navigateToDeployments()
        reportsModule.filterInitialDeployment()
        cy.wait(2000)
        reportsPage.getTableDeploymentStatus().contains('Initial')
        reportsModule.filterRollbackDeployment()
        cy.wait(2000)
        reportsPage.getTableDeploymentStatus().contains('Rollback')
        reportsModule.filterUndeployDeployment()
        cy.wait(2000)
        reportsPage.getTableDeploymentStatus().contains('Undeploy')
        reportsModule.filterUpgradeDeployment()
        cy.wait(2000)
        reportsPage.getTableDeploymentStatus().contains('Update')
    })

    it('Reports:Verify schedule of a control task(Rescan Artifact)', () => {
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

    it.only('User-Management:Create user, assign role and various permissions to user', () => {
        //Add a User
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        var userName = userManagementModule.addUser()

        //Add a Role to user
        userManagementModule.navigateToRoles()
        var roleName = userManagementModule.addRoleToUser(userName)

        //give local permissions for infra, environment and application.
        cy.wait(3000)
        ciExplorerSideBarModule.navigateToExplorerFromUserManagement()
        infraModule.assignInfraPermissionsToRole(roleName)
        envModule.assignEnvPermissionsToRole(roleName)
        appModule.assignAppPermissionsToRole(roleName)

        //Set login and reports view permissions on above role
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.navigateToPermissions()
        userManagementModule.assignLoginAndReportPermissionsToRole(roleName)

        //Logout and login as non admin user
        loginModule.logout()
        var password = userName + "U1"

        loginModule.login(Cypress.env('hostname'), userName, password)
        cy.wait(3000)
        cy.get('._pendo-close-guide').click({force: true});
        cy.wait(5000)

        //Try accessing the user management section
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSidebarPage.getListUserManagement().should('not.exist')

        //Access the reports dashboard
        ciExplorerSideBarModule.navigateToReports()
        ciExplorerSideBarModule.navigateToExplorerFromUserManagement()
    })

    it('Deploy an application from non admin user', () => {
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
        ciExplorerSideBarModule.navigateToExplorer()
        ciExplorerSideBarModule.navigateToUserManagement()
        userManagementModule.navigateToPermissions()
        userManagementModule.assignPermissionsToRole(roleName)

        //Logout and login as non admin user
        loginModule.logout()
        var password = userName + "U1"
        loginModule.login(Cypress.env('hostname'), userName, password)
        cy.wait(3000)
        cy.get('._pendo-close-guide').click({force: true});
        cy.wait(5000)

        //Create app, infra, environment and Deploy Applications
        var infraName = infraModule.createInfra()

        //Create Environment with the infrastrucutre created
        var envName = envModule.createEnv(infraName)

        //Create Application
        var appName = appModule.createApp()
        var appDepPkgName = appModule.createAppDepPkg(appName)
        var cmd1 = "systeminfo"
        var appCmdExe = appModule.createAppCmdExe(appName, appDepPkgName, cmd1)

        //Deploy Application
        deployApplicationModule.deployApplication(appName, envName, appDepPkgName)
    })
})