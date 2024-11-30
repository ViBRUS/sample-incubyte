describe('provided input', () => {
  it('should check if input box is editable', () => {
  	cy.visit('http://localhost:5173/');
  	cy.get('input[type="text"]').type('1');
  })
})
