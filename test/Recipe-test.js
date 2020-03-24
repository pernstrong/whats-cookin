const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/Recipe')


describe('Recipe', function() {

  let ingredient1;
  let ingredient2;
  let ingredient3;
  let ingredient4;
  let recipe1;
  let recipe2;

  beforeEach(function() {
    ingredient1 = {
      id: 20081,
      name: "wheat flour",
      price: 142,
      amount: 5
    }
    ingredient2 = {
      id: 18372,
      name: "bicarbonate of soda",
      price: 582,
      amount: 20
    }
    ingredient3 = {
      id: 1123,
      name: "eggs",
      price: 472,
      amount: 1
    }
    ingredient4 = {
      id: 4543522,
      name: 'beer',
      price: 1000,
      amount: 200
    }

    let recipe1 = {
      ingredients: [ingredient1, ingredient2, ingredient3, ingredient4],
      instructions: [{instruction: 'open beer', number: 1}, {instruction: 'drink beer', number: 2}, {instruction: 'place everything else in bowl', number: 3}, {instruction: 'order pizza', number: 4}],
      name: 'Beer and pizza',
      tags: ['snack', 'pizza', 'healthy']
    }

    let recipe2 = {
      ingredients: [ingredient4, ingredient3, ingredient2],
      instructions: [{instruction: 'crack eggs', number: 1}, {instruction: 'mix baking soda and beer', number: 2}, {instruction: 'place everything else in bowl', number: 3}, {instruction: 'heat in oven to 500 degrees', number: 4}, {instruction: 'eat while hot', number: 5}],
      name: 'bowl o stuff',
      tags: ['snack', 'stuff', 'healthy', 'gourmet']
    }

  })

  it('should be a function', function() {

    expect(Recipe).to.be.a('function')
  })

  it.skip('should be an instance of Recipe', function() {

    expect(recipe1).to.be.an.instaceof(Recipe)
  })

  it.skip('should know the ingredients it needs', function() {

  })

  it.skip('should have instructions', function() {

  })

  it.skip('should have a name', function() {


  })

  it.skip('should have tag(s)', function() {


  })

  it.skip('should return its instructions', function() {

    expect(recipe1.getInstructions()).to.deep.equal([{instruction: 'open beer', number: 1}, {instruction: 'drink beer', number: 2}, {instruction: 'place everything else in bowl', number: 3}, {instruction: 'order pizza', number: 4}])
  })


  it.skip('should return the total cost of ingredients needed', function() {

  })

  
})
