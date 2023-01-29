export default class CIExplorerSidebarPage {
    getButtonPluginsInstall() {
        return cy.get('div.PluginList__tile___2jNVB:nth-child(2) > div:nth-child(1) > button:nth-child(2)')
    }

    getIconBack() {
        return cy.get('.icon-back')
    }

    getIconTree() {
        return cy.get('.icon-tree')
    }

    getIconSettings() {
        return cy.get('.icon-settings')
    }

    getListGitOps() {
        return cy.get('li.MuiButtonBase-root:nth-child(6) > span:nth-child(1) > p:nth-child(2)')
    }

    getListLocalSources() {
        return cy.get('li.MuiButtonBase-root:nth-child(7) > span:nth-child(1) > p:nth-child(2)')
    }

    getListRulesAndMacros() {
        return cy.get('li.MuiButtonBase-root:nth-child(5) > span:nth-child(1) > p:nth-child(2)')
    }

    getMenuFeatures() {
        return cy.get('a.MuiButtonBase-root:nth-child(2) > span:nth-child(1) > p:nth-child(2)')
    }

    getMenuMonitoring() {
        return cy.get('[data-id="TASK_MONITOR"] > .infinite-tree-node > .infinite-tree-toggler')
    }

    getMenuMonitoringControlTasks() {
        return cy.get('div.infinite-tree-item:nth-child(3) > div:nth-child(1) > i:nth-child(2)')
    }

    getMenuSettings() {
        return cy.get('.settings > span:nth-child(2)')
    }

    getTitleStitch() {
        return cy.get("h6.MuiTypography-root")
    }

    getListUserManagement() {
        return cy.contains('User management')
    }

    getAdminUserNoDeleteOption() {
        return cy.get('table tbody tr').filter(':has(td:nth-child(1):contains("admin"))').filter(':has(td:nth-child(2):contains("Edit"))').and('not.include.text', "Delete").and('include.text', "Edit")
    }
}