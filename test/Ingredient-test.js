const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/Ingredient')

describe('Ingredient', function() {

  let ingredient1;
  let ingredient2;
  let ingredient3;

  beforeEach(function() {

    ingredient1 = new Ingredient(20081, "wheat flour", 142, 5)
    ingredient2 = new Ingredient(18372, "bicarbonate of soda", 582, 20)
    ingredient3 = new Ingredient(1123, "eggs", 472, 0)
    ingredient4 = new Ingredient(4543522, 'beer', 1000, 200)

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

  it('should have an amount', function() {

    expect(ingredient2.amount).to.equal(20)
    expect(ingredient4.amount).to.equal(200)
  })

  // it('can add to to the amount', function() {
  //
  //   expect(ingredient1.amount).to.equal(5)
  //   expect(ingredient3.amount).to.equal(0)
  //
  //   ingredient1.add(15)
  //   ingredient3.add(5)
  //
  //   expect(ingredient1.amount).to.equal(20)
  //   expect(ingredient3.amount).to.equal(5)
  // })
  //
  // it('can be used', function() {
  //   expect(ingredient1.amount).to.equal(5)
  //   expect(ingredient4.amount).to.equal(200)
  //
  //   ingredient1.use(3)
  //   ingredient4.use(101)
  //
  //   expect(ingredient1.amount).to.equal(2)
  //   expect(ingredient4.amount).to.equal(99)
  // })


})
