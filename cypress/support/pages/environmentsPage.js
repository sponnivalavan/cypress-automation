import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class EnvironmentsPage {
    createEnv(infraName) {
        cy.contains('Environments', {timeout: 10000}).click({force: true});
        cy.get('i[data-id="Environments"]').click({force: true});
        cy.get('.new > a:nth-child(1) > span:nth-child(2)').click()
        cy.get('.environment > span:nth-child(2)').click()
        var envName = UtilsModule.generate_random_string(5)
        cy.get('input[name=name]').clear().type(envName)
        cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ', {timeout: 20000}).eq(0).click({force: true}).type("Infrastructure/" + infraName)
        cy.get('.yt-option > span:nth-child(1) > div:nth-child(1) > strong:nth-child(1)', {timeout: 20000}).click({force: true})
        cy.get('button[type=button]').contains('Save and close').click({force: true});
        return envName
    }

    assignEnvPermissionsToRole(roleName) {
        cy.contains('Environments', {timeout: 10000}).click({force: true});
        cy.get('i[data-id="Environments"]').click({force: true});
        cy.get('.editPermissions > span:nth-child(2)').click()
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-3 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-4 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-5 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-6 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-7 > input:nth-child(1)`).click()
        cy.get('.save-and-close').click();
    }
}