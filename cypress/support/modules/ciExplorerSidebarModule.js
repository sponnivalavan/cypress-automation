import CIExplorerSidebarPage from '../pages/ciExplorerSidebarPage'

const ciExplorerSidebarPage = new CIExplorerSidebarPage()

export default class CIExplorerSidebarModule {
    navigateToExplorer() {
        ciExplorerSidebarPage.getIconBack().click()
    }

    navigateToExplorerFromUserManagement() {
        ciExplorerSidebarPage.getIconBack().click({force: true});
        ciExplorerSidebarPage.getIconTree().click({force: true});
    }

    navigateToReports() {
        cy.contains('Reports').click({force: true});
    }

    navigateToPlugins() {
        cy.contains('Plugins').click({force: true});
    }

    navigateToUserManagement() {
        ciExplorerSidebarPage.getListUserManagement().click()
    }

    navigateToSettings() {
        ciExplorerSidebarPage.getIconSettings().click()
        ciExplorerSidebarPage.getMenuSettings().click()
    }

    navigateToFeatures() {
        ciExplorerSidebarPage.getMenuFeatures().click()
    }

    navigateToMonitoring() {
        ciExplorerSidebarPage.getMenuMonitoring().click();
    }

    navigateToMonitoringControlTasks() {
        ciExplorerSidebarPage.getMenuMonitoringControlTasks().dblclick()
    }
}