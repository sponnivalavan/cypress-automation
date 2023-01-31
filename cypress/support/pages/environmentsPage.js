export default class EnvironmentsPage {
    getButtonSaveAndCloseEnvPermissions() {
        return cy.get('.save-and-close')
    }

    getButtonSaveAndCloseEnv() {
        return cy.get('.dip-view-body > div:nth-child(1) > button:nth-child(1)')
    }

    getLinkNew() {
        return cy.get('.new > a:nth-child(1) > span:nth-child(2)')
    }

    getLinkEnvironment() {
        return cy.get('.environment > span:nth-child(2)')
    }

    getLinkEditPermissionsEnv() {
        return cy.get('.editPermissions > span:nth-child(2)')
    }

    getIconEnvironments() {
        return cy.get('i[data-id="Environments"]')
    }

    getInputEnvironmentName() {
        return cy.get('input[name=name]')
    }

    getSelectInfraName() {
        return cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ')
    }

    getSelectEnvironmentTree() {
        return cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler')
    }
}