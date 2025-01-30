describe('Measurements Form', () => {
    it('should submit measurements successfully', () => {
      // First login to get the token
      cy.visit('/login')
      cy.get('label').contains('Email').find('input').type('test@example.com')
      cy.get('label').contains('Password').find('input').type('test123')
      cy.get('button').contains('Login').click()
  
      // Navigate to measurements page
      cy.url().should('include', '/measurements')
  
      // Setup measurement request intercept
      cy.intercept('POST', 'http://localhost:3001/api/measurements').as('measurementsRequest')
  
      // Fill form
      cy.get('input[name="height"]').type('170')
      cy.get('input[name="weight"]').type('70')
      cy.get('input[name="age"]').type('25')
      cy.get('input[name="bust"]').type('90')
      cy.get('input[name="waist"]').type('70')
      cy.get('input[name="hips"]').type('95')
  
      // Submit and log details
      cy.get('button[type="submit"]').click()
  
      cy.wait('@measurementsRequest').then((interception) => {
        cy.log('Request:', interception.request)
        cy.log('Response:', interception.response)
      })
    })
  })