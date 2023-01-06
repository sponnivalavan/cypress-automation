export default class CIExplorerSidebarPage {
    navigateToExplorer() {
        cy.get('.icon-back').click({force: true});
    }

    navigateToExplorerFromUserManagement() {
        cy.get('.icon-back').click({force: true});
        cy.get('.icon-tree').click({force: true});
    }

    navigateToReports() {
        cy.contains('Reports').click({force: true});
    }

    navigateToPlugins() {
        cy.contains('Plugins').click({force: true});
    }

    navigateToUserManagement() {
        cy.contains('User management').click({force: true});
    }

    navigateToSettings() {
        cy.get('.icon-settings').click({force: true});
        cy.get('.settings > span:nth-child(2)').click({force: true});
    }

    navigateToFeatures() {
        cy.get('a.MuiButtonBase-root:nth-child(2) > span:nth-child(1) > p:nth-child(2)').click();
    }

    navigateToMonitoring() {
        cy.get('[data-id="TASK_MONITOR"] > .infinite-tree-node > .infinite-tree-toggler').click();
    }

    navigateToMonitoringControlTasks() {
        cy.get('div.infinite-tree-item:nth-child(3) > div:nth-child(1) > i:nth-child(2)').dblclick()
    }
}