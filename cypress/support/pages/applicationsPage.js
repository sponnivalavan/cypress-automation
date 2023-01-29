export default class ApplicationsPage {
    getButton() {
        return cy.get("button[type=button]")
    }

    getButtonSave() {
        return cy.get('.dip-view-body > .btn-panel > .xl-primary')
    }

    getButtonSchedule() {
        return cy.get('.schedule')
    }

    getButtonSaveClose() {
        return cy.get('.save-and-close')
    }

    getIconApplication() {
        return 'i[data-id="Applications'
    }

    getInputAppName() {
        return cy.get('input[name=name]')
    }

    getInputFileUpload() {
        return cy.get('input[name=ajax_upload_file_input]').eq(0)
    }

    getLinkApp() {
        return cy.get('.application > span:nth-child(2)')
    }

    getLinkNew() {
        return cy.get('.new > a:nth-child(1)')
    }

    getLinkNewApp() {
        return cy.get('.new > a:nth-child(1) > span:nth-child(2)')
    }

    getLinkNewCmd() {
        return cy.get('.cmd > a:nth-child(1) > span:nth-child(2)')
    }

    getLinkNewDepPkg() {
        return cy.get('.deploymentPackage > span:nth-child(2)')
    }

    getLinkNewFile() {
        return cy.get('.file > a:nth-child(1) > span:nth-child(2)')
    }

    getLinkAppEditPermissions() {
        return cy.get('.editPermissions > span:nth-child(2)')
    }

    getLinkAppPermissionDisabled() {
        return cy.get('li.new.dropdown-submenu.disabled')
    }

    getLinkViewPermissions() {
        return cy.get('.viewPermissions')
    }

    getLinkRescanArtifact() {
        return cy.get('ul.dropdown-menu:nth-child(1) > li:nth-child(9) > a:nth-child(1) > span:nth-child(2)')
    }

    getMenuFile() {
        return cy.get('[data-path="new->file->file"] > .file > .menu-item-label')
    }

    getSelectCommand() {
        return cy.get('.command > span:nth-child(2)')
    }

    getSelectAppTree() {
        return cy.get('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler')
    }

    getSelectSchedule() {
        return cy.get('.schedule > a:nth-child(1)')
    }

    getTextAreaAppCmd() {
        return cy.get(':nth-child(1) > .xl-react-category-content > :nth-child(1) > .xl-react-components > .xl-react-components-input > .xl-react-widget-string-input-container > .xl-react-component-input-wrapper > textarea')
    }
}