const chai = require('chai');
const expect = chai.expect;
const allIngredients = require('../data/ingredients')
const allRecipes = require('../data/recipes')
// const allUsers = require('../data/users')
const Recipe = require('../src/Recipe')

describe('Recipe', () => {

  // let ingredient1;
  // let ingredient2;
  // let ingredient3;
  // let ingredient4;
  let recipe1;
  let recipe2;

  beforeEach( () => {

  recipe1 = new Recipe(allRecipes[0].id, allRecipes[0].image, allRecipes[0].ingredients, allRecipes[0].instructions, allRecipes[0].name, allRecipes[0].tags)
  recipe2 = new Recipe(allRecipes[1].id, allRecipes[1].image, allRecipes[1].ingredients, allRecipes[1].instructions, allRecipes[1].name, allRecipes[1].tags)


  })

  it('should be a function', () => {

    expect(Recipe).to.be.a('function')
  })

  it('should be an instance of Recipe', () => {
    expect(recipe1).to.be.an.instanceof(Recipe)
    expect(recipe2).to.be.an.instanceof(Recipe)
  })

  it('should have an id', () => {

    expect(recipe1.id).to.equal(595736)
    expect(recipe2.id).to.equal(678353)
  })

  it('should have an image', () => {

    expect(recipe1.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg")
    expect(recipe2.image).to.equal("https://spoonacular.com/recipeImages/678353-556x370.jpg")
  })


  it('should have ingredients', () => {

    expect(recipe1.ingredients[0].id).to.equal(20081)
    expect(recipe1.ingredients[3].id).to.equal(19335)
  })

  it('should know the instructions it needs', () => {

    expect(recipe1.instructions).to.deep.equal([{"instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.", "number": 1}, {"instruction": "Add egg and vanilla and mix until combined.", "number": 2}, {"instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.", "number": 3}, {"instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.", "number": 4}, {"instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.", "number": 5}, {"instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.", "number": 6}])
  })

  it('should have a name', () => {

    expect(recipe1.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups')
    expect(recipe2.name).to.equal('Maple Dijon Apple Cider Grilled Pork Chops')
  })

  it('should have tag(s)', () => {

    expect(recipe1.tags).to.deep.equal(["antipasti", "starter", "snack", "appetizer", "antipasto","hor d'oeuvre"])
    expect(recipe2.tags).to.deep.equal(["lunch", "main course", "main dish", "dinner"])
  })

  it('should return its instructions', () => {

    expect(recipe1.getInstructions()).to.deep.equal([{"instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.", "number": 1}, {"instruction": "Add egg and vanilla and mix until combined.", "number": 2}, {"instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.", "number": 3}, {"instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.", "number": 4}, {"instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.", "number": 5},{"instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.", "number": 6}])
  })


  it('should return the total cost of ingredients needed', () => {

    expect(recipe1.findTotalCost()).to.equal(17776)
  })


})
