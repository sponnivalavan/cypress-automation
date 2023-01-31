import Utils from "../common/utils";
import InfrastructurePage from "../pages/infrastructurePage";

const UtilsModule = new Utils()
const infrastructurePage = new InfrastructurePage()

export default class infrastructureModule {
    createInfra() {
        infrastructurePage.getTitleInfrastructure().click({force: true})
        infrastructurePage.getIconInfrastructure().click({force: true})
        infrastructurePage.getLinkNew().click()
        infrastructurePage.getLinkOverThere().click()
        infrastructurePage.getLinkLocalHost().click()
        var infraName = UtilsModule.generate_random_string(5)
        infrastructurePage.getInputInfraName().clear().type(infraName)
        infrastructurePage.getInputOSType().eq(0).click().type("WINDOWS")
        infrastructurePage.getButtonSaveInfra().click()
        return infraName
    }

    createInfraDirectory() {
        infrastructurePage.getTitleInfrastructure().click({force: true})
        infrastructurePage.getIconInfrastructure().click({force: true})
        infrastructurePage.getLinkNew().click()
        infrastructurePage.getLinkInfraDir().click()
        var infraDirName = UtilsModule.generate_random_string(5)
        infrastructurePage.getInputInfraName().clear().type(infraDirName)
        cy.wait(3000)
        infrastructurePage.getButtonSaveInfra().click()
        return infraDirName
    }

    navigateToInfraDirectory(dirName) {
        infrastructurePage.getTitleInfrastructure().click({force: true})
        infrastructurePage.getIconInfrastructure().click({force: true})
        infrastructurePage.getLinkInfraDirEditPermissions().click()
    }

    createInfraInsideDirectory(dirName) {
        cy.wait(3000)
        cy.get('div.infinite-tree-item:nth-child(4) > div:nth-child(1) > a:nth-child(1)').click({force: true});
        cy.wait(3000)
        cy.contains(dirName, {timeout: 50000}).click({force: true});
        cy.get(infrastructurePage.getIconInfrastructureForDir() + '/' + dirName , {timeout: 10000}).click({force: true})
        infrastructurePage.getLinkNew().click()
        infrastructurePage.getLinkOverThere().click()
        infrastructurePage.getLinkLocalHost().click()
        var infraName = UtilsModule.generate_random_string(5)
        infrastructurePage.getInputInfraName().clear().type(infraName)
        infrastructurePage.getInputOSType().eq(0).click().type("WINDOWS")
        infrastructurePage.getButtonSaveInfra().click()
        return infraName
    }

    executeControlTask(infraName) {
        infrastructurePage.getTitleInfrastructure().click({force: true})
        cy.get(infrastructurePage.getIconInfrastructureForDir() + '/' + infraName + '"', {timeout: 10000}).click({force: true})
        cy.get('ul.dropdown-menu:nth-child(1) > li:nth-child(10) > a:nth-child(1) > span:nth-child(2)').click()
        cy.wait(3000)
        cy.get('.execute').click()
        cy.wait(3000)
        cy.get('button[type=button]').contains('Finish').click({force: true});
        cy.wait(3000)
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
        infrastructurePage.getTitleInfrastructure().click({force: true})
        infrastructurePage.getIconInfrastructure().click({force: true});
        infrastructurePage.getLinkInfraDirEditPermissions().click()
        for (let i = 1; i <= 3; i++) {
            cy.get(`.permissions-pagination-table-component-${roleName}-${i} > input:nth-child(1)`).click()
        }
        infrastructurePage.getButtonSaveAndCloseInfra() + ", {timeout: 10000}.should('be.visible')"
        infrastructurePage.getButtonSaveAndCloseInfra().click({force: true});
    }
}