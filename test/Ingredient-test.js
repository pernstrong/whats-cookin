const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/Ingredient')

describe('Ingredient', function() {

  let ingredient1;
  let ingredient2;
  let ingredient3;

  beforeEach(function() {

    ingredient1 = new Ingredient(20081, "wheat flour", 142)
    ingredient2 = new Ingredient(18372, "bicarbonate of soda", 582)
    ingredient3 = new Ingredient(1123, "eggs", 472)
    ingredient4 = new Ingredient(4543522, 'beer', 1000)

  })

  it('should be a function', function() {

    expect(Ingredient).to.be.a('function')
  })

  it('should be an instance of Ingredient', function() {

    expect(ingredient1).to.be.an.instanceof(Ingredient)
  })

  it('should have an id', function () {

    expect(ingredient1.id).to.equal(20081);
    expect(ingredient4.id).to.equal(4543522);
  })

  it('should have a name', function() {

    expect(ingredient2.name).to.equal('bicarbonate of soda');
    expect(ingredient3.name).to.equal('eggs')
  })

  it('should have a price', function() {

    expect(ingredient1.price).to.equal(142);
    expect(ingredient4.price).to.equal(1000)
  })


})
