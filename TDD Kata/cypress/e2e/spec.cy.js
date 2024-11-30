describe('provided input', () => {
  it('should check if input box is editable', () => {
  	cy.visit('http://localhost:5173/');
  	cy.get('textarea[name="input"]').type('1');
  })
})

describe('calculate with single number input', () => {
	it('should check calculated value - single number', () => {
  		cy.visit('http://localhost:5173/');
  		cy.get('textarea[name="input"]').type('1');
  		cy.get('form').submit();
		cy.get('p.result').should('have.text', '1');
	})
})

describe('calculate with single number input', () => {
	it('should check calculated value - single number', () => {
  		cy.visit('http://localhost:5173/');
  		cy.get('textarea[name="input"]').type('a');
  		cy.get('form').submit();
		cy.get('p.result').should('have.text', '0');
	})
})

describe('calculate with 2 inputs', () => {
	it('should check calculated value - two numbers, comma separated', () => {
  		cy.visit('http://localhost:5173/');
  		cy.get('textarea[name="input"]').type('1,3');
  		cy.get('form').submit();
		cy.get('p.result').should('have.text', '4');
	})
})

describe('calculate with 2 inputs', () => {
	it('should check calculated value - two numbers, new line separated', () => {
  		cy.visit('http://localhost:5173/');
  		cy.get('textarea[name="input"]').type("1\n3");
  		cy.get('form').submit();
		cy.get('p.result').should('have.text', '4');
	})
})

describe('calculate with multi inputs', () => {
	it('should check calculated value - two numbers, new line separated, and comma separated', () => {
  		cy.visit('http://localhost:5173/');
  		cy.get('textarea[name="input"]').type("1\n2,3");
  		cy.get('form').submit();
		cy.get('p.result').should('have.text', '6');
	})
})

describe('Delimiter support', () => {
	it('should check calculated value - delimiter on first line', () => {
  		cy.visit('http://localhost:5173/');
  		cy.get('textarea[name="input"]').type("//;\n1;2");
  		cy.get('form').submit();
		cy.get('p.result').should('have.text', '3');
	})
})

describe('Negative number check', () => {
	it('should check error - negative numbers', () => {
  		cy.visit('http://localhost:5173/');
  		cy.get('textarea[name="input"]').type("-1,2");
  		cy.get('form').submit();
		cy.get('p.result').should('have.text', 'negative numbers not allowed -1');
	})
})