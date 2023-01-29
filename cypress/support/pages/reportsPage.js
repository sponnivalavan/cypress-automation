export default class reportsPage {
    getCheckInitialDeployment() {
        return cy.get('div.xl-react-autocomplete-suggestion:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)')
    }

    getCheckRollbackDeployment() {
        return cy.get('div.xl-react-autocomplete-suggestion:nth-child(2) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)')
    }

    getCheckUndeployDeployment() {
        return cy.get('div.xl-react-autocomplete-suggestion:nth-child(3) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)')
    }

    getCheckUpgradeDeployment() {
        return cy.get('div.xl-react-autocomplete-suggestion:nth-child(4) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)')
    }

    getInputSearchDeployment() {
        return cy.get('.react-tagsinput-tag')
    }

    getLinkClickBackToPage() {
        return cy.get('body')
    }

    getListDeployments() {
        return cy.get('[data-testid="sideNav-item-1"] > .dot-list-item-link > .MuiTypography-root')
    }

    getTableDeploymentStatus() {
        return cy.get(':nth-child(1) > .report-table-type > .with-popup-content')
    }

    getSearchDeployments() {
        return cy.get('.deployment-task-filter-types > span:nth-child(1) > span:nth-child(2)')
    }
}