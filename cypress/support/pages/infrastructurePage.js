export default class InfrastructurePage {
    getButtonSaveInfra() {
        return cy.get('.dip-view-body > div:nth-child(1) > button:nth-child(1)')
    }

    getButtonSaveAndCloseInfra() {
        return cy.get('.save-and-close')
    }

    getIconInfrastructure() {
        return cy.get('i[data-id="Infrastructure"]')
    }

    getIconInfrastructureForDir() {
        return 'i[data-id="Infrastructure'
    }

    getInputOSType() {
        return cy.get('.xl-react-autocomplete-wrapper .with-search input[type="text"] ')
    }

    getInputInfraName() {
        return cy.get('input[name=name]')
    }

    getLinkEditInfraPermissions() {
        return cy.get('.editPermissions > span:nth-child(2)')
    }

    getLinkInfraDir() {
        return cy.get('.directory > span:nth-child(2)')
    }

    getLinkInfraDirEditPermissions() {
        return cy.get('.editPermissions > span:nth-child(2)')
    }

    getLinkLocalHost() {
        return cy.get('.localhost > span:nth-child(2)')
    }

    getLinkNew() {
        return cy.get('.new > a:nth-child(1)')
    }

    getLinkOverThere() {
        return cy.get('.overthere > a:nth-child(1) > span:nth-child(2)')
    }

    getTitleInfrastructure() {
        return cy.contains('Infrastructure', {timeout: 50000})
    }
}