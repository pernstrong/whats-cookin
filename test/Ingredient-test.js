const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');

describe('Ingredient', () => {
  let ingredient1;
  let ingredient2;
  let ingredient3;

  beforeEach(() => {
    ingredient1 = new Ingredient(20081, 3);
    ingredient2 = new Ingredient(18372, 5);
    ingredient3 = new Ingredient(9003, 7);
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredient1).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', () => {
    expect(ingredient1.id).to.equal(20081);
    expect(ingredient2.id).to.equal(18372);
  });

  it('should have a name', () => {
    ingredient2.findName();
    ingredient3.findName();
    expect(ingredient2.name).to.equal('bicarbonate of soda');
    expect(ingredient3.name).to.equal('apple');
  });

  it('should have a price', () => {
    ingredient1.findPrice();
    ingredient3.findPrice();
    expect(ingredient1.price).to.equal(142);
    expect(ingredient3.price).to.equal(207);
  });
});
