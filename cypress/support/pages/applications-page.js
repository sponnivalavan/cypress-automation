import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class ApplicationsPage {
    createApplication(applicationName) {

        //Create Application
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.get('.new > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.application > span:nth-child(2)').click()
        var applicationName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').type(applicationName)
        //cy.get('button[type=button]').contains('Save and close').click({force: true});
        cy.get('.dip-view-body > .btn-panel > .xl-primary').click({force: true}).click({force: true});
        cy.log('appname:' + applicationName)
        cy.viewport(1400, 700)

        //Create Application Deployment Package
        cy.get('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > a:nth-child(1)', {timeout: 20000}).click({force: true});
        cy.get('i[data-id="Applications/' + applicationName + '"', {timeout: 10000}).click({force: true});
        cy.get('.new > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.deploymentPackage > span:nth-child(2)').click()
        cy.viewport(1400, 1000)
        var deploymentPackageName = UtilsModule.generate_random_string(7)
        cy.get('input[name=name]').clear().type(deploymentPackageName)
        cy.get('.dip-view-body > .btn-panel > .xl-primary').click({force: true}).click({force: true});
        cy.log('deploymentPackageName:' + deploymentPackageName)

        //Create Command Execution
        cy.viewport(1400, 700)
        //cy.get('div.infinite-tree-item:nth-child(3) > div:nth-child(1) > a:nth-child(1)', {timeout: 10000}).click({force: true});
        cy.get('i[data-id="Applications/' + applicationName + '"', {timeout: 10000}).click({force: true});
        cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.get('i[data-id="Applications/' + applicationName + '/' + deploymentPackageName + '"', {timeout: 10000}).click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.cmd > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.command > span:nth-child(2)').click()
        var cmdName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').type(cmdName)
        cy.get(':nth-child(1) > .xl-react-category-content > :nth-child(1) > .xl-react-components > .xl-react-components-input > .xl-react-widget-string-input-container > .xl-react-component-input-wrapper > textarea').type('systeminfo')
        cy.wait(2000)
        cy.get('button[type=button]').contains('Save and close').click({force: true});

        return applicationName
    }
}