import ReportsPage from "../pages/reportsPage";

const reportsPage = new ReportsPage()
export default class reportsModule {

    navigateToDeployments() {
        reportsPage.getListDeployments().click({force: true});
    }

    filterInitialDeployment() {
        reportsPage.getSearchDeployments().click({force: true})
        reportsPage.getCheckInitialDeployment().click({force: true})
        reportsPage.getLinkClickBackToPage().click(0, 0)
    }

    filterRollbackDeployment() {
        reportsPage.getInputSearchDeployment().click()
        reportsPage.getCheckInitialDeployment().click({force: true})
        reportsPage.getCheckRollbackDeployment().click({force: true})
        reportsPage.getLinkClickBackToPage().click(0, 0)
    }

    filterUndeployDeployment() {
        reportsPage.getInputSearchDeployment().click()
        reportsPage.getCheckRollbackDeployment().click({force: true})
        reportsPage.getCheckUndeployDeployment().click({force: true})
        reportsPage.getLinkClickBackToPage().click(0, 0)
    }

    filterUpgradeDeployment() {
        reportsPage.getInputSearchDeployment().click()
        reportsPage.getCheckUndeployDeployment().click({force: true})
        reportsPage.getCheckUpgradeDeployment().click({force: true})
        reportsPage.getLinkClickBackToPage().click(0, 0)
    }
}