export default class ReportsPage {
    navigateToDashboard() {
        cy.get('Dashboard').click({force: true});
    }

    navigateToDeployment() {
        cy.contains('Deployments',{timeout: 10000}).click({force: true});
    }

    navigateToControltasks() {
        cy.contains('Control tasks',{timeout: 10000}).click({force: true});
    }

    navigateToAuditreport() {
        cy.contains('Audit report').click({force: true});
    }

    clickSearch() {
        cy.get('div.deployment-task-report.deployment-task-filter-types > span > span').click()
    }

    clickInitial() {
        cy.contains('INITIAL').click({force: true})
        cy.wait(10000)
    }

    unclickInitial() {
        cy.contains('INITIAL').click({force: true})
        cy.wait(10000)
    }

    clickRollback() {
        cy.contains('ROLLBACK').click({force: true})
        cy.wait(10000)
    }

    clickUndeploy() {
        cy.contains('UNDEPLOY').click({force: true})
        cy.wait(10000)
    }

    clickUpgrade() {
        cy.contains('UPGRADE').click({force: true})
        cy.wait(10000)
    }

}