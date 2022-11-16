import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class InfrastructurePage {
    createInfrastructure() {
        var element
        cy.contains('Infrastructure', {timeout: 10000}).click({force: true});
        cy.get('div.infinite-tree-item:nth-child(4) > div:nth-child(1) > i:nth-child(4)', {timeout: 20000}).click({force: true});
        cy.get('.new > a:nth-child(1)').click()
        cy.get('.overthere > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.localhost > span:nth-child(2)').click()
        var infrastructureName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').clear().type(infrastructureName)
        cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ', {timeout: 20000}).eq(1).click({force: true}).type("WINDOWS")
        cy.get('.dip-view-body > div:nth-child(1) > button:nth-child(1)').click({force: true});
        return infrastructureName
    }
}