import Utils from "../common/utils";
import InfrastructurePage from "../pages/infrastructurePage";

const UtilsModule = new Utils()
const infrastructurePage = new InfrastructurePage()

export default class infrastructureModule {
    createInfra() {
        cy.contains('Infrastructure', {timeout: 50000}).click({force: true});
        cy.get(infrastructurePage.iconInfrastrucutre).click({force: true});
        cy.get(infrastructurePage.linkNew).click()
        cy.get(infrastructurePage.linkOverthere).click()
        cy.get(infrastructurePage.linkLocalHost).click()
        var infraName = UtilsModule.generate_random_string(5)
        cy.get(infrastructurePage.inputInfraName).clear().type(infraName)
        cy.get(infrastructurePage.inputOSType).eq(0).click().type("WINDOWS")
        cy.get(infrastructurePage.buttonSaveInfra).click()
        return infraName
    }

    createInfraDirectory() {
        cy.contains('Infrastructure', {timeout: 50000}).click({force: true});
        cy.get(infrastructurePage.iconInfrastrucutre).click({force: true});
        cy.get(infrastructurePage.linkNew).click()
        cy.get(infrastructurePage.linkInfraDir).click()
        var infraDirName = UtilsModule.generate_random_string(5)
        cy.get(infrastructurePage.inputInfraName).clear().type(infraDirName)
        cy.wait(3000)
        cy.get(infrastructurePage.buttonSaveInfra).click()
        return infraDirName
    }

    navigateToInfraDirectory(dirName) {
        cy.contains('Infrastructure', {timeout: 50000}).click({force: true});
        cy.get(infrastructurePage.iconInfrastrucutre).click({force: true});
        cy.get(infrastructurePage.linkInfraDirEditPermissions).click();
    }

    createInfraInsideDirectory(dirName) {
        cy.wait(3000)
        cy.get('div.infinite-tree-item:nth-child(4) > div:nth-child(1) > a:nth-child(1)').click({force: true});
        cy.wait(3000)
        cy.contains(dirName, {timeout: 50000}).click({force: true});
        cy.get((infrastructurePage.iconInfrastrucutre) + dirName + '"', {timeout: 10000}).click({force: true});
        cy.get(infrastructurePage.linkNew).click()
        cy.get(infrastructurePage.linkOverthere).click()
        cy.get(infrastructurePage.linkLocalHost).click()
        var infraName = UtilsModule.generate_random_string(5)
        cy.get(infrastructurePage.inputInfraName).clear().type(infraName)
        cy.get(infrastructurePage.inputOSType).eq(0).click().type("WINDOWS")
        cy.get(infrastructurePage.buttonSaveInfra).click()
        return infraName
    }

    executeControlTask(infraName) {
        cy.contains(infraName, {timeout: 50000}).click({force: true});
        cy.get((infrastructurePage.iconInfrastrucutre) + infraName + '"', {timeout: 10000}).click({force: true});
        cy.get('ul.dropdown-menu:nth-child(1) > li:nth-child(10) > a:nth-child(1) > span:nth-child(2)').click()
        cy.wait(3000)
        cy.get('.execute').click()
        cy.wait(3000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
    }

    executeControlTaskLocalInfra(dirName, infraName) {
        cy.get('[data-path=".3"] > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.get('[data-id="Infrastructure/' + dirName + '"] > .infinite-tree-node > .infinite-tree-toggler').click({force: true});
        cy.get('span[data-id="Infrastructure/' + dirName + '/' + infraName + '"', {timeout: 10000}).click({force: true});
        cy.get('.infinite-tree-selected > .infinite-tree-node > .context-menu-button').click()
        cy.get('ul.dropdown-menu:nth-child(1) > li:nth-child(10) > a:nth-child(1) > span:nth-child(2)').click()
        cy.wait(3000)
        cy.get('.execute').click()
        cy.wait(3000)
    }

    assignInfraPermissionsToRole(roleName) {
        cy.contains('Infrastructure', {timeout: 50000}).click({force: true});
        cy.get(infrastructurePage.iconInfrastrucutre).click({force: true});
        cy.get(infrastructurePage.linkInfraDirEditPermissions).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-1 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-3 > input:nth-child(1)`).click()
        cy.get((infrastructurePage.buttonSaveAndCloseInfra), {timeout: 10000}).should('be.visible')
        cy.get(infrastructurePage.buttonSaveAndCloseInfra).click({force: true});
    }
}