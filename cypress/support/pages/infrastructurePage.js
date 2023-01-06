import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class InfrastructurePage {
    createInfra() {
        cy.contains('Infrastructure', {timeout: 50000}).click({force: true});
        cy.get('i[data-id="Infrastructure"]').click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.overthere > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.localhost > span:nth-child(2)').click()
        var infraName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').clear().type(infraName)
        cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ').eq(0).click().type("WINDOWS")
        cy.get('.dip-view-body > div:nth-child(1) > button:nth-child(1)').click();
        return infraName
    }

    createInfraDirectory() {
        cy.contains('Infrastructure', {timeout: 50000}).click({force: true});
        cy.get('i[data-id="Infrastructure"]').click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.directory > span:nth-child(2)').click()
        var infraDirName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').clear().type(infraDirName)
        cy.wait(3000)
        cy.get('.dip-view-body > div:nth-child(1) > button:nth-child(1)').click({force: true});
        cy.wait(3000)
        return infraDirName
    }

    navigateToInfraDirectory(dirName) {
        cy.contains('Infrastructure', {timeout: 50000}).click({force: true});
        cy.get('i[data-id="Infrastructure"]').click({force: true});
        cy.get('.editPermissions > span:nth-child(2)').click()
    }

    createInfraInsideDirectory(dirName) {
        cy.wait(3000)
        cy.get('div.infinite-tree-item:nth-child(4) > div:nth-child(1) > a:nth-child(1)').click({force: true});
        cy.wait(3000)
        cy.contains(dirName, {timeout: 50000}).click({force: true});
        cy.get('i[data-id="Infrastructure/' + dirName + '"', {timeout: 10000}).click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.overthere > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.localhost > span:nth-child(2)').click()
        var infraName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').clear().type(infraName)
        cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ').eq(0).click().type("WINDOWS")
        cy.get('.dip-view-body > div:nth-child(1) > button:nth-child(1)').click();
        return infraName
    }

    executeControlTask(infraName) {
        cy.contains(infraName, {timeout: 50000}).click({force: true});
        //cy.get('i[data-id="Infrastructure"]').click({force: true});
        cy.get('i[data-id="Infrastructure/' + infraName + '"', {timeout: 10000}).click({force: true});
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
        cy.get('i[data-id="Infrastructure"]').click({force: true});
        cy.get('.editPermissions > span:nth-child(2)').click()
        cy.get(`.permissions-pagination-table-component-${roleName}-1 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-3 > input:nth-child(1)`).click()
        cy.get('.save-and-close', {timeout: 10000}).should('be.visible')
        cy.get('.save-and-close').click({force: true});
    }
}