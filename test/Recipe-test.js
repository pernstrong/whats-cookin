const chai = require('chai');
const expect = chai.expect;
const recipeTestData = require('../test/recipe-test-data')

const Recipe = require('../src/Recipe')

describe('Recipe', () => {

  let recipe1;
  let recipe2;

  beforeEach(() => {
    recipe1 = new Recipe(recipeTestData[0].id, recipeTestData[0].image, recipeTestData[0].ingredients, recipeTestData[0].instructions, recipeTestData[0].name, recipeTestData[0].tags);
    recipe2 = new Recipe(recipeTestData[1].id, recipeTestData[1].image, recipeTestData[1].ingredients, recipeTestData[1].instructions, recipeTestData[1].name, recipeTestData[1].tags);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(recipe1).to.be.an.instanceof(Recipe);
    expect(recipe2).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe1.id).to.equal(595736);
    expect(recipe2.id).to.equal(678353);
  });

  it('should have an image', () => {
    expect(recipe1.image).to.equal("www.elliotskitchen.com/foodimage2");
    expect(recipe2.image).to.equal("https://www.daveskitchen.com/foodimage");
  });

  it('should have ingredients', () => {
    expect(recipe1.ingredients[0].id).to.equal(20081);
    expect(recipe1.ingredients[3].id).to.equal(19335);
  });

  it('should know the instructions it needs', () => {
    expect(recipe1.instructions).to.deep.equal([{
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    }, {
      "instruction": "Add egg and vanilla and mix until combined.",
      "number": 2
    }, {
      "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
      "number": 3
    }, {
      "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
      "number": 4
    }, {
      "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
      "number": 5
    }, {
      "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
      "number": 6
    }]);
  });

  it('should have a name', () => {
    expect(recipe1.name).to.equal('Elliots Magical Cookies');
    expect(recipe2.name).to.equal('Dave\'s Food For the Mouth');
  });

  it('should have tag(s)', () => {
    expect(recipe1.tags).to.deep.equal(["antipasti", "cookie", "snack"]);
    expect(recipe2.tags).to.deep.equal(["food", "main course", "main dish", "dinner", "not healthy"]);
  });

  it('should return its instructions', () => {
    expect(recipe1.getInstructions()).to.deep.equal([{
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    }, {
      "instruction": "Add egg and vanilla and mix until combined.",
      "number": 2
    }, {
      "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
      "number": 3
    }, {
      "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
      "number": 4
    }, {
      "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
      "number": 5
    }, {
      "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
      "number": 6
    }]);
  });

  it('should return the total cost of ingredients needed', () => {
    expect(recipe1.findTotalCost()).to.equal(17776);
  });
});
