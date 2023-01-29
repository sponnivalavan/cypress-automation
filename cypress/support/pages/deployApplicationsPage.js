export default class ApplicationsPage {
    getButton() {
        return cy.get('button[type=button]')
    }

    getButtonDeploy() {
        return cy.get('.deploy > span:nth-child(2)')
    }

    getButtonUnDeploy() {
        return cy.get('.undeploy > span:nth-child(2)')
    }

    getButtonDeployAll() {
        return cy.get('.deploy')
    }
}