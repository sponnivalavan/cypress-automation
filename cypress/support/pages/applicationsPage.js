import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class ApplicationsPage {

    createApp(appName) {
        //Create Application
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.get('.new > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.application > span:nth-child(2)').click()
        var appName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').type(appName)
        cy.get('.dip-view-body > .btn-panel > .xl-primary').click({force: true}).click({force: true});
        cy.log('appname:' + appName)
        cy.wait(3000)
        cy.viewport(1400, 700)
        return appName
    }

    checkAppPermissions(appName) {
        //Create Application
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.wait(3000)
        cy.get('li.new.dropdown-submenu.disabled').should('be.visible')
        cy.get('.viewPermissions').should('not.be.disabled')
    }

    createAppDepPkg(appName) {
        //Create Application Deployment Package
        cy.viewport(1400, 700)
        cy.get('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > a:nth-child(1)', {timeout: 20000}).click({force: true});
        cy.get('i[data-id="Applications/' + appName + '"', {timeout: 10000}).click({force: true});
        cy.wait(3000)
        cy.get('.new > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.deploymentPackage > span:nth-child(2)').click()
        cy.viewport(1400, 1000)
        var depPkgName = "Initial-" + UtilsModule.generate_random_string(7)
        cy.get('input[name=name]').clear().type(depPkgName)
        cy.wait(3000)
        cy.contains('Save and close').click({force: true});
        cy.wait(3000)
        return depPkgName
    }

    createAppDepPkgUpgrade(appName) {
        //Create Application Deployment Package for Upgrade
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '"', {timeout: 10000}).click({force: true});
        cy.get('.new > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.deploymentPackage > span:nth-child(2)').click()
        cy.viewport(1400, 1000)
        var depPkgName = "Upgrade-" + UtilsModule.generate_random_string(7)
        cy.get('input[name=name]').clear().type(depPkgName)
        cy.wait(3000)
        cy.contains('Save and close').click({force: true});
        cy.wait(3000)
        return depPkgName
    }

    createAppCmdExe(appName, depPkgName, cmd) {
        //Create Command Execution
        cy.viewport(1400, 700)
        cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.get('i[data-id="Applications/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.cmd > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.command > span:nth-child(2)').click()
        var cmdName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').type(cmdName)
        cy.get(':nth-child(1) > .xl-react-category-content > :nth-child(1) > .xl-react-components > .xl-react-components-input > .xl-react-widget-string-input-container > .xl-react-component-input-wrapper > textarea').type(cmd)
        cy.wait(2000)
        cy.get('.dip-view-body > .btn-panel > .xl-primary').click({force: true}).click({force: true});
        cy.wait(2000)
    }

    createAppFile(appName, depPkgName, filepath) {
        //Create Command Execution
        cy.viewport(1400, 700)
        cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.get('i[data-id="Applications/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.file > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('[data-path="new->file->file"] > .file > .menu-item-label').click()
        var fileName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').type(fileName)
        cy.get('button[type=button]').contains('Browse').click({force: true})
        cy.get('input[name=ajax_upload_file_input]').eq(0).selectFile(filepath, {force: true})
        cy.get('button[type=button]').contains('Save').click()
        cy.wait(2000)
        return fileName
    }

    createAppCmdExeForUpgrade(appName, depPkgName, cmd) {
        //Create Command Execution
        cy.viewport(1400, 700)
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '"', {timeout: 20000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.cmd > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.command > span:nth-child(2)').click()
        var cmdName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').type(cmdName)
        cy.get(':nth-child(1) > .xl-react-category-content > :nth-child(1) > .xl-react-components > .xl-react-components-input > .xl-react-widget-string-input-container > .xl-react-component-input-wrapper > textarea').type(cmd)
        cy.wait(2000)
        cy.get('.dip-view-body > .btn-panel > .xl-primary').click({force: true}).click({force: true});
    }

    rescanArtifact(appName, depPkgName, filename) {
        cy.get('i[data-id="Applications/' + appName + '"', {timeout: 20000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '/' + depPkgName + '"', {timeout: 20000}).click({force: true});
        cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.get('i[data-id="Applications/' + appName + '/' + depPkgName + '/' + filename + '"', {timeout: 20000}).click({force: true});
        cy.get('ul.dropdown-menu:nth-child(1) > li:nth-child(9) > a:nth-child(1) > span:nth-child(2)').click({force: true});
        cy.get('.schedule > a:nth-child(1)').click({force: true});
        cy.wait(5000)
        cy.get('.schedule').click({force: true});
        cy.wait(5000)
    }

    assignAppPermissionsToRole(roleName) {
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.get('.editPermissions > span:nth-child(2)').click()
        cy.get(`.permissions-pagination-table-component-${roleName}-1 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-3 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-4 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-5 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-6 > input:nth-child(1)`).click()
        cy.get('.save-and-close').click();
    }
}