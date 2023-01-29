export default class SettingsPage {
    getButton() {
        return cy.get("button[type=button]")
    }

    getButtonFeaturesSave() {
        return cy.get('.features-container > div:nth-child(2) > button:nth-child(1)')
    }

    getCheckAnalyticsGuidance() {
        return cy.get('div.xl-react-dip-dynamic-form-element:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')
    }

    getCheckAllowUsersOptOut() {
        return cy.get('div.xl-react-dip-dynamic-form-element:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')
    }

    getCheckProfileAnalyticsGuidance() {
        return cy.get('div.xl-react-dip-dynamic-form-element:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')
    }

    getLogoImage() {
        return cy.get('div').find('img').should('have.attr', 'src').should('include', 'ciExplorerDist/libs/images/deploy-logo-5506ebfd2a8b504f81b5ba636d1746ca.svg')
    }

    getIconClose() {
        return cy.get("i.close-icon:nth-child(3)")
    }

    getIconCloseAboutWindow() {
        return cy.get('i.close-icon:nth-child(1)')
    }

    getIconClosePendo() {
        return cy.get('._pendo-close-guide')
    }

    getIconHelp() {
        return cy.get('.icon-help')
    }

    getInputFileUpload() {
        return cy.get("input[name=\"ajax_upload_file_input\"]")
    }

    getInputInstanceName() {
        return cy.get("input[name=\"instanceName\"]")
    }

    getLabelHeader() {
        return cy.get('div.instance-name:nth-child(1) > label:nth-child(1)')
    }

    getLinkAbout() {
        return cy.get('.about > span:nth-child(2)')
    }

    getLinkOnlineDoc() {
        return cy.get('.onlineDocumentation')
    }

    getLinkUserProfile() {
        return cy.get('.userProfile > span:nth-child(2)')
    }

    getMenuSettings() {
        return cy.get('.settings > span:nth-child(2)')
    }

    getMenuSettingsAbout() {
        return cy.get('.about > span:nth-child(2)')
    }

    getMenuSettingsMaintenanceMode() {
        return cy.get('.maintenanceMode > span:nth-child(2)')
    }

    getMenuSettingsRenewLicense() {
        return cy.get('.renewLicense > span:nth-child(2)')
    }

    getMenuSettingsSysInfo() {
        return cy.get('.systemInformation > span:nth-child(2)')
    }

    getMenuSettingsViewAs() {
        return cy.get('.viewAs > span:nth-child(2)')
    }

    getSelectColor() {
        return cy.get('div.color-swatch:nth-child(4)')
    }

    getTextAreaLoginScreenMessage() {
        return cy.get("textarea[name=\"loginScreenMessage\"]")
    }

    getTextColor() {
        return cy.get('.color-swatch')
    }

    getTextServerVersion() {
        return cy.get('.server-version')
    }

    getTextSysInfo() {
        return cy.get('.statistics-title > h3:nth-child(1)')
    }

    getTitleAbout() {
        return cy.get('span.title:nth-child(1)')
    }

    getTitleProductAnalyticsGuidance() {
        return cy.get('.pendo-header-title')
    }

    getTitleSysInfo() {
        return cy.get('span.title:nth-child(1)')
    }
}