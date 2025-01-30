/// <reference types="cypress" />

describe('User Flow', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('should allow user to register, login and add measurements', () => {
    // Store email to use for both registration and login
    const testEmail = `test${Date.now()}@example.com`
    const testPassword = 'test123'

    // Test Registration
    cy.visit('/register')
    cy.intercept('POST', 'http://localhost:3001/api/users/register').as('registerRequest')

    // before submitting
    console.log('About to submit measurements')
    cy.get('button[type="submit"]').click()

    cy.get('label').contains('First Name').find('input').type('John')
    cy.get('label').contains('Last Name').find('input').type('Doe')
    cy.get('label').contains('Email').find('input').type(testEmail)
    cy.get('label').contains('Password').find('input').type(testPassword)
    
    cy.get('button').contains('Register').click()

    // Wait for registration request
    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201)
    })

    // Verify redirection to login
    cy.url().should('include', '/login')

    // Test Login with same email
    cy.get('label').contains('Email').find('input').type(testEmail)
    cy.get('label').contains('Password').find('input').type(testPassword)
    cy.get('button').contains('Login').click()

    // Wait for login success and navigation
    cy.wait(1000) // Give time for redirect

    // Test Adding Measurements
    cy.url().should('include', '/measurements')

    cy.get('input[name="height"]').type('170')
    cy.get('input[name="weight"]').type('70')
    cy.get('input[name="age"]').type('25')
    cy.get('input[name="bust"]').type('90')
    cy.get('input[name="waist"]').type('70')
    cy.get('input[name="hips"]').type('95')
    

    // Setup intercept BEFORE clicking submit
    cy.intercept('POST', 'http://localhost:3001/api/measurements').as('measurementsRequest')
    
    cy.get('button[type="submit"]').click()

    // Wait and log the request/response details
    cy.wait('@measurementsRequest').then((interception) => {
      // Log details about the request and response
      cy.log('Request body:', JSON.stringify(interception.request.body))
      cy.log('Response:', JSON.stringify(interception.response?.body))
      
      if (interception.response?.statusCode === 400) {
        cy.log('Measurement submission failed:', interception.response.body)
      }
    })
    // Check for alert or success message
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Measurements saved successfully!')
    })

  })
})