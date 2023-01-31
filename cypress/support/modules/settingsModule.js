import SettingsPage from '../pages/settingsPage'

const settingsPage = new SettingsPage()
export default class SettingsModule {
    addLoginScreenMessage(message) {
        settingsPage.getTextAreaLoginScreenMessage().clear().type(message)
        settingsPage.getButton().contains('Save').click()
    }

    removeLoginScreenMessage() {
        settingsPage.getTextAreaLoginScreenMessage().clear()
        settingsPage.getButton().contains('Save').click()
    }

    uploadLogoFile(filepath) {
        settingsPage.getInputInstanceName().clear().type("Testing")
        settingsPage.getButton().contains('Browse').click()
        settingsPage.getInputFileUpload().selectFile(filepath, {force: true})
        settingsPage.getButton().contains('Save').click()
        cy.wait(3000)
    }

    clearLogoFile() {
        settingsPage.getInputInstanceName().clear()
        settingsPage.getIconClose().click({force: true})
        settingsPage.getButton().contains('Save').click()
        cy.wait(3000)
    }

    popupAbout() {
        cy.window().then(function (p) {
            settingsPage.getTitleAbout().contains('About')
            settingsPage.getTextServerVersion().contains('Server version:')
            settingsPage.getIconCloseAboutWindow().click({force: true})
            cy.wait(3000)
        });
    }

    popupSysInfo() {
        cy.window().then(function (p) {
            settingsPage.getTitleSysInfo().contains('System information')
            settingsPage.getTextSysInfo().contains('Deploy system information')
            settingsPage.getIconCloseAboutWindow().click({force: true})
        });
    }
}