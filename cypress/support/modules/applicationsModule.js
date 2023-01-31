import Utils from "../common/utils";
import ApplicationsPage from "../pages/applicationsPage";

const UtilsModule = new Utils()
const applicationsPage = new ApplicationsPage()

export default class ApplicationsModule {
    createApp(appName) {
        //Create Application
        cy.get(applicationsPage.getIconApplication(), {timeout: 10000}).click({force: true})
        applicationsPage.getLinkNewApp().click()
        applicationsPage.getLinkApp().click()
        var appName = UtilsModule.generate_random_string(5)
        applicationsPage.getInputAppName().type(appName)
        applicationsPage.getButtonSave().click({force: true}).click({force: true});
        cy.wait(3000)
        cy.viewport(1400, 700)
        return appName
    }

    checkAppPermissions(appName) {
        //Create Application
        cy.get(applicationsPage.getIconApplication(), {timeout: 10000}).click({force: true})
        cy.wait(3000)
        applicationsPage.getLinkAppPermissionDisabled().should('be.visible')
        applicationsPage.getLinkViewPermissions().should('not.be.disabled')
    }

    createAppDepPkg(appName) {
        //Create Application Deployment Package
        cy.viewport(1400, 700)
        cy.get('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > a:nth-child(1)', {timeout: 20000}).click({force: true});
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '"', {timeout: 10000}).click({force: true})
        cy.wait(3000)
        applicationsPage.getLinkNewApp().click()
        applicationsPage.getLinkNewDepPkg().click()
        cy.viewport(1400, 1000)
        var depPkgName = "Initial-" + UtilsModule.generate_random_string(7)
        applicationsPage.getInputAppName().clear().type(depPkgName)
        cy.wait(3000)
        cy.contains('Save and close').click({force: true});
        cy.wait(3000)
        return depPkgName
    }

    createAppDepPkgUpgrade(appName) {
        //Create Application Deployment Package for Upgrade
        cy.get(applicationsPage.getIconApplication(), {timeout: 10000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '"', {timeout: 10000}).click({force: true})
        applicationsPage.getLinkNewApp().click()
        applicationsPage.getLinkNewDepPkg().click()
        cy.viewport(1400, 1000)
        var depPkgName = "Upgrade-" + UtilsModule.generate_random_string(7)
        applicationsPage.getInputAppName().clear().type(depPkgName)
        cy.wait(3000)
        cy.contains('Save and close').click({force: true});
        cy.wait(3000)
        return depPkgName
    }

    createAppCmdExe(appName, depPkgName, cmd) {
        //Create Command Execution
        cy.viewport(1400, 700)
        applicationsPage.getSelectAppTree().click({force: true});
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true})
        applicationsPage.getLinkNew().click()
        applicationsPage.getLinkNewCmd().click()
        applicationsPage.getSelectCommand().click()
        var cmdName = UtilsModule.generate_random_string(5)
        applicationsPage.getInputAppName().type(cmdName)
        applicationsPage.getTextAreaAppCmd().type(cmd)
        cy.wait(2000)
        applicationsPage.getButtonSave().click({force: true}).click({force: true});
        cy.wait(2000)
    }

    createAppFile(appName, depPkgName, filepath) {
        //Create Command Execution
        cy.viewport(1400, 700)
        applicationsPage.getSelectAppTree().click({force: true});
        cy.get(applicationsPage.getIconApplication() + "/" + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true})
        applicationsPage.getLinkNewApp().click()
        applicationsPage.getLinkNewFile().click()
        applicationsPage.getMenuFile().click()
        var fileName = UtilsModule.generate_random_string(5)
        applicationsPage.getInputAppName().type(fileName)
        applicationsPage.getButton().contains('Browse').click({force: true})
        applicationsPage.getInputFileUpload().selectFile(filepath, {force: true})
        applicationsPage.getButton().contains('Save').click()
        cy.wait(2000)
        return fileName
    }

    createAppCmdExeForUpgrade(appName, depPkgName, cmd) {
        //Create Command Execution
        cy.viewport(1400, 700)
        cy.get(applicationsPage.getIconApplication(), {timeout: 10000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + '/' + appName + '"', {timeout: 20000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + '/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true})
        applicationsPage.getLinkNew().click()
        applicationsPage.getLinkNewCmd().click()
        applicationsPage.getSelectCommand().click()
        var cmdName = UtilsModule.generate_random_string(5)
        applicationsPage.getInputAppName().type(cmdName)
        applicationsPage.getTextAreaAppCmd().type(cmd)
        cy.wait(2000)
        applicationsPage.getButtonSave().click({force: true})
        cy.wait(2000)
    }

    rescanArtifact(appName, depPkgName, filename) {
        cy.get(applicationsPage.getIconApplication() + '/' + appName + '"', {timeout: 20000}).click({force: true})
        cy.wait(2000)
        cy.get(applicationsPage.getIconApplication() + '/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true})
        applicationsPage.getSelectAppTree().click({force: true});
        cy.get(applicationsPage.getIconApplication() + '/' + appName + '/' + depPkgName + '/' + filename + '"', {timeout: 20000}).click({force: true})
        applicationsPage.getLinkRescanArtifact().click({force: true});
        applicationsPage.getSelectSchedule().click({force: true});
        cy.wait(5000)
        applicationsPage.getButtonSchedule().click({force: true});
        cy.wait(5000)
    }

    assignAppPermissionsToRole(roleName) {
        cy.get(applicationsPage.getIconApplication(), {timeout: 10000}).click({force: true})
        applicationsPage.getLinkAppEditPermissions().click()
        for (let i = 1; i <= 6; i++) {
            cy.get(`.permissions-pagination-table-component-${roleName}-${i} > input:nth-child(1)`).click()
        }
        applicationsPage.getButtonSaveClose().click();
    }
}