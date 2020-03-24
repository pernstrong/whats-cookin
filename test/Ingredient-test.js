const chai = require('chai');
const expect = chai.expect;
const allIngredients = require('../data/ingredients')
const Ingredient = require('../src/Ingredient')


// trying with arro
describe('Ingredient', () => {

  let ingredient1;
  let ingredient2;
  let ingredient3;

  beforeEach( () => {

    ingredient1 = new Ingredient(allIngredients[0].id, allIngredients[0].name, allIngredients[0].estimatedCostInCents)
    ingredient2 = new Ingredient(allIngredients[1].id, allIngredients[1].name, allIngredients[1].estimatedCostInCents)
    ingredient3 = new Ingredient(allIngredients[2].id, allIngredients[2].name, allIngredients[2].estimatedCostInCents)
  })

  it('should be a function', () => {

    expect(Ingredient).to.be.a('function')
  })

  it('should be an instance of Ingredient', () => {

    expect(ingredient1).to.be.an.instanceof(Ingredient)
  })

  it('should have an id', () => {

    expect(ingredient1.id).to.equal(20081);
    expect(ingredient2.id).to.equal(18372);
  })

  it('should have a name', () => {

    expect(ingredient2.name).to.equal('bicarbonate of soda');
    expect(ingredient3.name).to.equal('eggs')
  })

  it('should have a price', () => {

    expect(ingredient1.price).to.equal(142);
    expect(ingredient3.price).to.equal(472)
  })

})
