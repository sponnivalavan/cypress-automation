export default class SettingsPage {
    login(hostname, username, password) {
        cy.visit(hostname)
        cy.get('input[name=username]').clear().type(username)
        cy.get('input[name=password]').clear().type(password)
        cy.get('button[type=submit]').click()
    }

    addLoginScreenMessage(message) {
        cy.get('textarea[name=loginScreenMessage]').clear().type(message)
        cy.wait(2000)
        cy.viewport(1400, 700)
        cy.get('button[type=button]').contains('Save').click({force: true})
        cy.get('button[type=button]').contains('Save').should('be.disabled');
    }

    uploadLogoFile(filepath) {
        cy.get('input[name=instanceName]').clear().type("Testing")
        cy.get('button[type=button]').contains('Browse').click({force: true})
        cy.get('input[name=ajax_upload_file_input]').selectFile(filepath, {force: true})
        cy.get('button[type=button]').contains('Save').click()
        cy.wait(3000)
    }

    clearLogoFile() {
        cy.get('input[name=instanceName]').clear()
        cy.get('i.close-icon:nth-child(3)').click({force: true})
        cy.get('button[type=button]').contains('Save').click()
        cy.wait(3000)
    }
}