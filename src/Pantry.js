// need all three for this class???
const allIngredients = require('../data/ingredients')
const allRecipes = require('../data/recipes')
const allUsers = require('../data/users')
// does this class use both below???
// need require('../src/Recipe')???
// const User = require('../User')
// const Recipe = require('/Recipe')

class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  addToIngredient(name, amountToAdd) {
     this.ingredients.find(ingredient => {
      if (ingredient.name === name) {
       return ingredient.amount += amountToAdd
      }
    })
  }

  useIngredient(name, amountToUse) {
    let curIngredient = null;
    let curIndex = null;
    this.ingredients.find((ingredient, index) => {
      if (ingredient.name === name) {
        ingredient.amount -= amountToUse
        curIngredient = ingredient;
        curIndex = index
      }
    })
    this.removeIngredientIfUsedUp(curIngredient, curIndex)
  }

  removeIngredientIfUsedUp(ingredient, index) {
    if (ingredient.amount <= 0) {
      this.ingredients.splice(index, 1)
    }
  }

  addNewIngredient(newIngredient) {
    this.ingredients.push(newIngredient)
  }

}


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
