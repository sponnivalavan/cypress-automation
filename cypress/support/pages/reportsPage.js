import Utils from "../common/utils";

const UtilsModule = new Utils()

export default class reportsPage {
    navigateToDeployments() {
        cy.get('[data-testid="sideNav-item-1"] > .dot-list-item-link > .MuiTypography-root').click({force: true});
    }

    filterInitialDeployment() {
        cy.get('.deployment-task-filter-types > span:nth-child(1) > span:nth-child(2)').click({force: true});
        cy.get('div.xl-react-autocomplete-suggestion:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({force: true});
        cy.get('body').click(0, 0)
    }

    filterRollbackDeployment() {
        cy.get('.react-tagsinput-tag').click()
        cy.get('div.xl-react-autocomplete-suggestion:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({force: true});
        cy.get('div.xl-react-autocomplete-suggestion:nth-child(2) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({force: true});
        cy.get('body').click(0, 0)
    }

    filterUndeployDeployment() {
        cy.get('.react-tagsinput-tag').click()
        cy.get('div.xl-react-autocomplete-suggestion:nth-child(2) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({force: true});
        cy.get('div.xl-react-autocomplete-suggestion:nth-child(3) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({force: true});
        cy.get('body').click(0, 0)
    }

    filterUpgradeDeployment() {
        cy.get('.react-tagsinput-tag').click()
        cy.get('div.xl-react-autocomplete-suggestion:nth-child(3) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({force: true});
        cy.get('div.xl-react-autocomplete-suggestion:nth-child(4) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({force: true});
        cy.get('body').click(0, 0)
    }
}