const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry')



describe('User', function() {

  let ingredient1;
  let ingredient2;
  let ingredient3;
  let ingredient4;
  let pantry1;
  let pantry2;
  let pantry3;
  let pantry4;

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
    pantry1 = new Pantry([ingredient1, ingredient2, ingredient3, ingredient4])
    pantry2 = new Pantry([ingredient4, ingredient3, ingredient2])
  })

  it('should be a function', function() {

    expect(Pantry).to.be.a('function');
  })

  it('should be an instance of Pantry', function() {

    expect(pantry1).to.be.an.instanceof(Pantry)
  })

  it('should hold ingredients', function() {

    expect(pantry1.ingredients.length).to.equal(4)
    expect(pantry2.ingredients.length).to.equal(3)
  })

  it('the ingredients should have type', function() {

    expect(pantry1.ingredients[0].name).to.equal('wheat flour');
    expect(pantry2.ingredients[2].name).to.equal('bicarbonate of soda')
  })

  it('should know how many of each ingredient it has', function() {

    expect(pantry1.ingredients[0].amount).to.equal(5)
    expect(pantry2.ingredients[1].amount).to.equal(1)
  })

  it('should be able to more of the same ingredient to pantry', function() {

    expect(pantry1.ingredients[0].amount).to.equal(5)
    expect(pantry2.ingredients[0].amount).to.equal(200)
    expect(pantry2.ingredients[2].amount).to.equal(20)

    pantry1.addToIngredient('wheat flour', 10)
    pantry2.addToIngredient('beer', 30)
    pantry2.addToIngredient('bicarbonate of soda', 10)

    expect(pantry1.ingredients[0].amount).to.equal(15)
    expect(pantry2.ingredients[0].amount).to.equal(230)
    expect(pantry2.ingredients[2].amount).to.equal(30)
  })

  it('should be able to use an ingredient', function() {

    expect(pantry1.ingredients[0].amount).to.equal(5)
    expect(pantry2.ingredients[0].amount).to.equal(200)
    expect(pantry2.ingredients[2].amount).to.equal(20)

    pantry1.useIngredient('wheat flour', 4)
    pantry2.useIngredient('beer', 14)
    pantry2.useIngredient('bicarbonate of soda', 10)

    expect(pantry1.ingredients[0].amount).to.equal(1)
    expect(pantry2.ingredients[0].amount).to.equal(186)
    expect(pantry2.ingredients[2].amount).to.equal(10)
  })

  it('should be able to add a new ingredient', function() {
    expect(pantry2.ingredients.length).to.equal(3)

    pantry2.addNewIngredient(ingredient1)

    expect(pantry2.ingredients.length).to.equal(4)
    expect(pantry2.ingredients[3].name).to.equal('wheat flour')
  })

  it('should no longer contain the ingredient if there its amount is 0', function() {

    expect(pantry1.ingredients[0].amount).to.equal(5)
    expect(pantry2.ingredients[0].amount).to.equal(200)

    pantry1.useIngredient('wheat flour', 4)
    pantry2.useIngredient('beer', 200)

    expect(pantry1.ingredients[0].amount).to.equal(1)
    // console.log(pantry2.ingredients)
    expect(pantry2.ingredients.length).to.equal(2)
    expect(pantry2.ingredients).to.deep.equal([{
      id: 1123,
      name: "eggs",
      price: 472,
      amount: 1
    },
      ingredient2 = {
      id: 18372,
      name: "bicarbonate of soda",
      price: 582,
      amount: 20
      }
    ])
  })

  // ????
  it.skip('should be able to tell if it has enough ingredients for a specific recipe', function() {

  })

})
