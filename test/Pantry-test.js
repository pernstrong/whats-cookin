const chai = require('chai');
const expect = chai.expect;
const ingredientTestData = require('../test/ingredient-test-data')
const userTestData = require('../test/user-test-data')
const allRecipes = require('../test/recipe-test-data');

const Pantry = require('../src/Pantry')
const Ingredient = require('../src/Ingredient')
const User = require('../src/User')
const Recipe = require('../src/Recipe')

describe('Pantry', function() {

  let pantry0;
  let pantry1;
  let pantry2;

  let recipe1;
  let recipe2;
  let recipe3;
  let recipe4;
  let recipe5;
  let recipe6;

  beforeEach(function() {
    const createIngredients = (userData) => {
      return userData.pantry.map(ingr => {
        let curIngr = new Ingredient(ingr.ingredient, ingr.amount);
        curIngr.findName();
        curIngr.findPrice();
        return curIngr;
      });
    }

    pantry0 = new Pantry(createIngredients(userTestData[0]));
    pantry1 = new Pantry(createIngredients(userTestData[2]));
    pantry2 = new Pantry(createIngredients(userTestData[3]));

    recipe1 = new Recipe(allRecipes[0].id, allRecipes[0].image, allRecipes[0].ingredients, allRecipes[0].instructions, allRecipes[0].name, allRecipes[0].tags);
    recipe2 = new Recipe(allRecipes[1].id, allRecipes[1].image, allRecipes[1].ingredients, allRecipes[1].instructions, allRecipes[1].name, allRecipes[1].tags);
    recipe3 = new Recipe(allRecipes[2].id, allRecipes[2].image, allRecipes[2].ingredients, allRecipes[2].instructions, allRecipes[2].name, allRecipes[2].tags);
    recipe4 = new Recipe(allRecipes[3].id, allRecipes[3].image, allRecipes[3].ingredients, allRecipes[3].instructions, allRecipes[3].name, allRecipes[3].tags);
    recipe5 = new Recipe(allRecipes[4].id, allRecipes[4].image, allRecipes[4].ingredients, allRecipes[4].instructions, allRecipes[4].name, allRecipes[4].tags);
    recipe6 = new Recipe(allRecipes[5].id, allRecipes[5].image, allRecipes[5].ingredients, allRecipes[5].instructions, allRecipes[5].name, allRecipes[5].tags);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry1).to.be.an.instanceof(Pantry);
  });

  it('should hold ingredients', () => {
    expect(pantry1.ingredients.length).to.equal(2);
    expect(pantry2.ingredients.length).to.equal(3);
  });

  it('should know how many of each ingredients it has based on its user', () => {
    expect(pantry1.ingredients[0].quantity).to.equal(3);
    expect(pantry2.ingredients[2].quantity).to.equal(7);
  });

  it('should know if it doesn\'t have enough ingredients in pantry for meal', () => {
    expect(pantry0.checkPantry(recipe1)).to.equal(false);
  });

  it('should know if their pantry does have enough ingredients to cook a given meal', () => {
    expect(pantry0.checkPantry(recipe5)).to.equal(true);
  });


  it('should know if it is missing an ingredient', () => {
    expect(pantry0.findMissingIngredients(recipe6.returnIdAndAmount())[4]).to.equal(undefined);
  });

  it('should determine the amount of ingredients still needed to cook a given meal', () => {
    expect(pantry0.findIngredientsNeeded(recipe6)).to.deep.equal([{
      id: 14412,
      amount: 1
    }, {
      id: 20090,
      amount: 5
    }])
  });
});
