import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class ApplicationsPage {
    deployApplication(applicationName, environmentName) {
        cy.get('i[data-id="Applications"', {timeout: 10000}).click({force: true});
        cy.get('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > a:nth-child(1)', {timeout: 20000}).click({force: true});
        cy.get('i[data-id="Applications/' + applicationName + '"', {timeout: 10000}).click({force: true});
        cy.get('.latest-version').click()
        cy.wait(3000)
        cy.get('input[value="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get('button[type=button]').contains('Continue').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(3000)
        cy.get('.deploy').click({force: true})
        cy.wait(5000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
    }
    undeployApplication(applicationName, environmentName) {
        cy.get('div.infinite-tree-item:nth-child(3) > div:nth-child(1) > a:nth-child(1)', {timeout: 10000}).click({force: true});
        cy.get('i[data-id="Environments/' + environmentName + '"', {timeout: 10000}).click({force: true});
        cy.get('div.infinite-tree-item:nth-child(4) > div:nth-child(1) > a:nth-child(1)', {timeout: 10000}).click({force: true});
        cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.get('i[data-id="Environments/' + environmentName + '/' + applicationName + '"', {timeout: 10000}).click({force: true});
        cy.get('.undeploy > span:nth-child(2)', {timeout: 10000}).click({force: true});
        cy.wait(5000)
        cy.get('button[type=button]').contains('Undeploy').click({force: true});
        cy.wait(5000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
    }
}