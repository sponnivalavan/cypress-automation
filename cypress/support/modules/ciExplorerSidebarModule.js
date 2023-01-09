import CIExplorerSidebarPage from '../pages/ciExplorerSidebarPage'

const ciExplorerSidebarPage = new CIExplorerSidebarPage()

export default class CIExplorerSidebarModule {
    navigateToExplorer() {
        cy.get(ciExplorerSidebarPage.iconBack).click({force: true});
    }

    navigateToExplorerFromUserManagement() {
        cy.get(ciExplorerSidebarPage.iconBack).click({force: true});
        cy.get(ciExplorerSidebarPage.iconTree).click({force: true});
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
        cy.get(ciExplorerSidebarPage.iconSettings).click({force: true});
        cy.get(ciExplorerSidebarPage.menuSettings).click({force: true});
    }

    navigateToFeatures() {
        cy.get(ciExplorerSidebarPage.menuFeatures).click();
    }

    navigateToMonitoring() {
        cy.get(ciExplorerSidebarPage.menuMonitoring).click();
    }

    navigateToMonitoringControlTasks() {
        cy.get(ciExplorerSidebarPage.menuMonitoringControlTasks).dblclick()
    }
}