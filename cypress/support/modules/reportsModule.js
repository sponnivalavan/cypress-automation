import ReportsPage from "../pages/reportsPage";

const reportsPage = new ReportsPage()
export default class reportsModule {

    navigateToDeployments() {
        cy.get(reportsPage.listDeployments).click({force: true});
    }

    filterInitialDeployment() {
        cy.get(reportsPage.searchDeployments).click({force: true});
        cy.get(reportsPage.checkInitialDeployment).click({force: true});
        cy.get(reportsPage.clickBackToPage).click(0, 0)
    }

    filterRollbackDeployment() {
        cy.get(reportsPage.inputSearchDeployment).click()
        cy.get(reportsPage.checkInitialDeployment).click({force: true});
        cy.get(reportsPage.checkRollbackDeployment).click({force: true});
        cy.get(reportsPage.clickBackToPage).click(0, 0)
    }

    filterUndeployDeployment() {
        cy.get(reportsPage.inputSearchDeployment).click()
        cy.get(reportsPage.checkRollbackDeployment).click({force: true});
        cy.get(reportsPage.checkUndeployDeployment).click({force: true});
        cy.get(reportsPage.clickBackToPage).click(0, 0)
    }

    filterUpgradeDeployment() {
        cy.get(reportsPage.inputSearchDeployment).click()
        cy.get(reportsPage.checkUndeployDeployment).click({force: true});
        cy.get(reportsPage.checkUpgradeDeployment).click({force: true});
        cy.get(reportsPage.clickBackToPage).click(0, 0)
    }
}