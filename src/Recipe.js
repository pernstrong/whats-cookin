// need all three for this class???
const allIngredients = require('../data/ingredients')
const allRecipes = require('../data/recipes')
// const allUsers = require('../data/users')

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  getInstructions = () => {
    return this.instructions
  }

  findTotalCost = () => {
    let totalCost = 0;
    this.ingredients.forEach(currentIngredient => {
      allIngredients.find(ingredient => {
        if (currentIngredient.id === ingredient.id) {
          totalCost += (ingredient.estimatedCostInCents * currentIngredient.quantity.amount)
        }
      })
    })
    return totalCost;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
