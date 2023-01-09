import SettingsPage from '../pages/settingsPage'

const settingsPage = new SettingsPage()
export default class SettingsModule {
    addLoginScreenMessage(message) {
        cy.get(settingsPage.textAreaLoginScreenMessage).clear().type(message)
        cy.wait(2000)
        cy.viewport(1400, 700)
        cy.get(settingsPage.buttonSave).contains('Save').click({force: true})
        cy.get(settingsPage.buttonSave).contains('Save').should('be.disabled')
    }

    uploadLogoFile(filepath) {
        cy.get(settingsPage.inputInstanceName).clear().type("Testing")
        cy.get(settingsPage.buttonBrowse).contains('Browse').click({force: true})
        cy.get(settingsPage.inputFileUpload).selectFile(filepath, {force: true})
        cy.get(settingsPage.buttonSave).contains('Save').click()
        cy.wait(3000)
    }

    clearLogoFile() {
        cy.get(settingsPage.inputInstanceName).clear()
        cy.get(settingsPage.iconClose).click({force: true})
        cy.get(settingsPage.buttonSave).contains('Save').click()
        cy.wait(3000)
    }

    popupAbout() {
        cy.window().then(function (p) {
            cy.get(settingsPage.titleAbout).contains('About')
            cy.get(settingsPage.textServerVersion).contains('Server version:')
            cy.get(settingsPage.iconCloseAboutWindow).click({force: true})
            cy.wait(3000)
        });
    }

    popupSysInfo() {
        cy.window().then(function (p) {
            cy.get(settingsPage.titleSysInfo).contains('System information')
            cy.get(settingsPage.textSysInfo).contains('Deploy system information')
            cy.get(settingsPage.iconCloseAboutWindow).click({force: true})
        });
    }
}