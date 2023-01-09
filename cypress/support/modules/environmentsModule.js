import Utils from "../common/utils";
import EnvironmentsPage from "../pages/environmentsPage";

const UtilsModule = new Utils()
const environmentsPage = new EnvironmentsPage()

export default class EnvironmentsModule {
    createEnv(infraName) {
        cy.contains('Environments', {timeout: 10000}).click({force: true});
        cy.get(environmentsPage.iconEnvironments).click({force: true});
        cy.get(environmentsPage.linkNew).click()
        cy.get(environmentsPage.linkEnvironment).click()
        var envName = UtilsModule.generate_random_string(5)
        cy.get(environmentsPage.inputEnvironmentName).clear().type(envName)
        cy.get((environmentsPage.selectInfraName), {timeout: 20000}).eq(0).click({force: true}).type("Infrastructure/" + infraName)
        cy.viewport(1400, 700)
        cy.get(environmentsPage.buttonSaveAndCloseEnv).click({force: true});
        return envName
    }

    assignEnvPermissionsToRole(roleName) {
        cy.contains('Environments', {timeout: 10000}).click({force: true});
        cy.get(environmentsPage.iconEnvironments).click({force: true});
        cy.get(environmentsPage.linkEditPermissionsEnv).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-3 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-4 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-5 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-6 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-7 > input:nth-child(1)`).click()
        cy.get(environmentsPage.buttonSaveAndCloseEnv).click();
    }
}