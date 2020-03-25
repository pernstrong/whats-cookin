const chai = require('chai');
const expect = chai.expect;
const ingredientTestData = require('../test/ingredient-test-data')
const Ingredient = require('../src/Ingredient')

describe('Ingredient', () => {
  let ingredient1;
  let ingredient2;
  let ingredient3;

  beforeEach( () => {

    ingredient1 = new Ingredient(ingredientTestData[0].id, ingredientTestData[0].name, ingredientTestData[0].estimatedCostInCents)
    ingredient2 = new Ingredient(ingredientTestData[1].id, ingredientTestData[1].name, ingredientTestData[1].estimatedCostInCents)
    ingredient3 = new Ingredient(ingredientTestData[2].id, ingredientTestData[2].name, ingredientTestData[2].estimatedCostInCents)
  })

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredient1).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', () => {

    expect(ingredient1.id).to.equal(20);
    expect(ingredient2.id).to.equal(5280);
  })

  it('should have a name', () => {

    expect(ingredient2.name).to.equal('baking soda');
    expect(ingredient3.name).to.equal('pre birds')
  })

  it('should have a price', () => {

    expect(ingredient1.price).to.equal(10);
    expect(ingredient3.price).to.equal(1492)
  })

})
