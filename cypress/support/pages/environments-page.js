import Utils from "../common/utils";
const UtilsModule = new Utils()

export default class EnvironmentsPage{
    createEnvironment(infrastructureName) {
        cy.contains('Environments', {timeout: 10000}).click({force: true});
        cy.get('div.infinite-tree-item:nth-child(3) > div:nth-child(1) > i:nth-child(4)', {timeout: 10000}).click({force: true});
        cy.get('.new > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.environment > span:nth-child(2)').click()
        var environmentName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').clear().type(environmentName)
        cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ', {timeout: 20000}).eq(0).click({force: true}).type("Infrastructure/"+ infrastructureName)
        cy.get('.yt-option > span:nth-child(1) > div:nth-child(1) > strong:nth-child(1)', {timeout: 20000}).click({force: true})
        cy.get('button[type=button]').contains('Save and close').click({force: true});
        return environmentName
    }
}