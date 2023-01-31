import Utils from "../common/utils";
import EnvironmentsPage from "../pages/environmentsPage";

const UtilsModule = new Utils()
const environmentsPage = new EnvironmentsPage()

export default class EnvironmentsModule {
    createEnv(infraName) {
        cy.contains('Environments', {timeout: 10000}).click({force: true});
        environmentsPage.getIconEnvironments().click({force: true});
        environmentsPage.getLinkNew().click()
        environmentsPage.getLinkEnvironment().click()
        var envName = UtilsModule.generate_random_string(5)
        environmentsPage.getInputEnvironmentName().clear().type(envName)
        //environmentsPage.getSelectInfraName(), {timeout: 20000}.eq(0).click({force: true}).type("Infrastructure/" + infraName))
        cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ', {timeout: 20000}).eq(0).click({force: true}).type("Infrastructure/" + infraName)
        cy.viewport(1400, 700)
        environmentsPage.getButtonSaveAndCloseEnv().click({force: true});
        return envName
    }

    assignEnvPermissionsToRole(roleName) {
        cy.contains('Environments', {timeout: 10000}).click({force: true});
        environmentsPage.getIconEnvironments().click({force: true});
        environmentsPage.getLinkEditPermissionsEnv().click()
        for (let i = 2; i <= 7; i++) {
            cy.get(`.permissions-pagination-table-component-${roleName}-${i} > input:nth-child(1)`).click()
        }
        cy.wait(5000)
        environmentsPage.getButtonSaveAndCloseEnvPermissions().click();
    }
}