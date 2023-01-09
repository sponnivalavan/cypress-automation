import Utils from "../common/utils";
import ApplicationsPage from "../pages/applicationsPage";

const UtilsModule = new Utils()
const applicationsPage = new ApplicationsPage()

export default class ApplicationsModule {
    createApp(appName) {
        //Create Application
        cy.get(applicationsPage.iconApplication, {timeout: 10000}).click({force: true});
        cy.get(applicationsPage.linkNewApp).click()
        cy.get(applicationsPage.linkApp).click()
        var appName = UtilsModule.generate_random_string(5)
        cy.get(applicationsPage.inputAppName).type(appName)
        cy.get(applicationsPage.buttonSave).click({force: true}).click({force: true});
        cy.log('appname:' + appName)
        cy.wait(3000)
        cy.viewport(1400, 700)
        return appName
    }

    checkAppPermissions(appName) {
        //Create Application
        cy.get(applicationsPage.iconApplication, {timeout: 10000}).click({force: true});
        cy.wait(3000)
        cy.get(applicationsPage.linkAppPermissionDisabled).should('be.visible')
        cy.get(applicationsPage.linkViewPermissions).should('not.be.disabled')
    }

    createAppDepPkg(appName) {
        //Create Application Deployment Package
        cy.viewport(1400, 700)
        cy.get('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > a:nth-child(1)', {timeout: 20000}).click({force: true});
        cy.get(applicationsPage.iconApplication + "/" + appName + '"', {timeout: 10000}).click({force: true});
        cy.wait(3000)
        cy.get(applicationsPage.linkNewApp).click()
        cy.get(applicationsPage.linkNewDepPkg).click()
        cy.viewport(1400, 1000)
        var depPkgName = "Initial-" + UtilsModule.generate_random_string(7)
        cy.get(applicationsPage.inputAppName).clear().type(depPkgName)
        cy.wait(3000)
        cy.contains('Save and close').click({force: true});
        cy.wait(3000)
        return depPkgName
    }

    createAppDepPkgUpgrade(appName) {
        //Create Application Deployment Package for Upgrade
        cy.get(applicationsPage.iconApplication, {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + "/" + appName + '"', {timeout: 10000}).click({force: true});
        cy.get(applicationsPage.linkNewApp).click()
        cy.get(applicationsPage.linkNewDepPkg).click()
        cy.viewport(1400, 1000)
        var depPkgName = "Upgrade-" + UtilsModule.generate_random_string(7)
        cy.get(applicationsPage.inputAppName).clear().type(depPkgName)
        cy.wait(3000)
        cy.contains('Save and close').click({force: true});
        cy.wait(3000)
        return depPkgName
    }

    createAppCmdExe(appName, depPkgName, cmd) {
        //Create Command Execution
        cy.viewport(1400, 700)
        cy.get(applicationsPage.selectAppTree).click({force: true});
        cy.get((applicationsPage.iconApplication) + '/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get(applicationsPage.linkNew).click()
        cy.get(applicationsPage.linkNewCmd).click()
        cy.get(applicationsPage.selectCommand).click()
        var cmdName = UtilsModule.generate_random_string(5)
        cy.get(applicationsPage.inputAppName).type(cmdName)
        cy.get(applicationsPage.textAreaAppCmd).type(cmd)
        cy.wait(2000)
        cy.get(applicationsPage.buttonSave).click({force: true}).click({force: true});
        cy.wait(2000)
    }

    createAppFile(appName, depPkgName, filepath) {
        //Create Command Execution
        cy.viewport(1400, 700)
        cy.get(applicationsPage.selectAppTree).click({force: true});
        cy.get(applicationsPage.iconApplication + '/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get(applicationsPage.linkNewApp).click()
        cy.get(applicationsPage.linkNewFile).click()
        cy.get(applicationsPage.menuFile).click()
        var fileName = UtilsModule.generate_random_string(5)
        cy.get(applicationsPage.inputAppName).type(fileName)
        cy.get(applicationsPage.buttonBrowse).contains('Browse').click({force: true})
        cy.get(applicationsPage.inputFileUpload).eq(0).selectFile(filepath, {force: true})
        cy.get(applicationsPage.buttonSaveFile).contains('Save').click()
        cy.wait(2000)
        return fileName
    }

    createAppCmdExeForUpgrade(appName, depPkgName, cmd) {
        //Create Command Execution
        cy.viewport(1400, 700)
        cy.get(applicationsPage.iconApplication, {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + '/' + appName + '"', {timeout: 20000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + '/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get(applicationsPage.linkNew).click()
        cy.get(applicationsPage.linkNewCmd).click()
        cy.get(applicationsPage.selectCommand).click()
        var cmdName = UtilsModule.generate_random_string(5)
        cy.get(applicationsPage.inputAppName).type(cmdName)
        cy.get(applicationsPage.textAreaAppCmd).type(cmd)
        cy.wait(2000)
        cy.get(applicationsPage.buttonSave).click({force: true}).click({force: true});
    }

    rescanArtifact(appName, depPkgName, filename) {
        cy.get(applicationsPage.iconApplication + '/' + appName + '"', {timeout: 20000}).click({force: true});
        cy.wait(2000)
        cy.get(applicationsPage.iconApplication + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get(applicationsPage.selectAppTree).click({force: true});
        cy.get(applicationsPage.iconApplication + appName + '/' + depPkgName + '/' + filename + '"', {timeout: 20000}).click({force: true});
        cy.get(applicationsPage.rescanArtifact()).click({force: true});
        cy.get(applicationsPage.selectSchedule).click({force: true});
        cy.wait(5000)
        cy.get(applicationsPage.buttonSchedule).click({force: true});
        cy.wait(5000)
    }

    assignAppPermissionsToRole(roleName) {
        cy.get(applicationsPage.iconApplication, {timeout: 10000}).click({force: true});
        cy.get(applicationsPage.linkAppEditPermissions).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-1 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-3 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-4 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-5 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-6 > input:nth-child(1)`).click()
        cy.get(applicationsPage.buttonSaveAndClose).click();
    }
}