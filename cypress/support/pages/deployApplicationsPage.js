import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class ApplicationsPage {
    deployApplication(appName, environmentName, appDepPkgName) {
        cy.viewport(1400, 700)
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '/' + appDepPkgName + '"', {timeout: 10000}).click({force: true});
        cy.viewport(1400, 700)
        cy.get('.deploy > span:nth-child(2)').click()
        cy.wait(10000)
        cy.get('input[value="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get('button[type=button]').contains('Continue').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(8000)
        cy.get('.deploy').click({force: true})
        cy.wait(8000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
    }

    rollbackApplication(appName, environmentName, appDepPkgName) {
        cy.viewport(1400, 700)
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Applications/' + appName + '/' + appDepPkgName + '"', {timeout: 10000}).click({force: true});
        cy.viewport(1400, 700)
        cy.get('.deploy > span:nth-child(2)').click()
        cy.wait(10000)
        cy.get('input[value="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get('button[type=button]').contains('Continue').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(8000)
        cy.get('.deploy').click({force: true})
        cy.wait(8000)
        cy.get('button[type=button]').contains('Rollback').click({force: true});
        cy.wait(8000)
        cy.get('button[type=button]').contains('Yes').click({force: true});
        cy.wait(8000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
    }

    upgradeApplication(appName, envName, appDepPkgNameUpgrade) {
        cy.get('i[data-id="Applications/' + appName + '/' + appDepPkgNameUpgrade + '"', {timeout: 10000}).click({force: true});
        cy.viewport(1400, 700)
        cy.get('.deploy > span:nth-child(2)').click()
        cy.wait(10000)
        cy.get('input[value="Environments/' + envName + '"', {timeout: 10000}).click({force: true});
        cy.get('button[type=button]').contains('Continue').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(8000)
        cy.get('.deploy').click({force: true})
        cy.wait(8000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
    }

    undeployApplication(applicationName, environmentName) {
        cy.viewport(1400, 700)
        cy.get('i[data-id="Environments"', {timeout: 10000}).click({force: true});
        cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.wait(5000)
        cy.get('i[data-id="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.wait(2000)
        cy.get('i[data-id="Environments/' + environmentName + '/' + applicationName + '"', {timeout: 10000}).click({force: true});
        cy.wait(2000)
        cy.get('.undeploy > span:nth-child(2)', {timeout: 10000}).click({force: true});
        cy.wait(5000)
        cy.get('button[type=button]').contains('Undeploy').click({force: true});
        cy.wait(8000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
    }
}