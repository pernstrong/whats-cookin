const allIngredients = require('../data/ingredients');
const allRecipes = require('../data/recipes');
const allUsers = require('../data/users');
const Recipe = require('../src/Recipe');

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFromFavoriteRecipes(recipe) {
    this.favoriteRecipes.forEach((currentRecipe, i) => {
      if (currentRecipe === recipe) {
        this.favoriteRecipes.splice(i, 1);
      }
    });
  }

  addToRecipesToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  filterByTag(tag) {
    let result = this.favoriteRecipes.filter(currentRecipe => {
      return currentRecipe.tags.includes(tag);
    });
    return result;
  }

  searchFavorites(searchTerm) {
    let result = this.favoriteRecipes.filter(currentRecipe => {
      return currentRecipe.name === searchTerm || currentRecipe.ingredients
    })
  }
}



// addToIngredient = (name, amountToAdd) =>{
//    this.ingredients.find(ingredient => {
//     if (ingredient.name === name) {
//      return ingredient.amount += amountToAdd
//     }
//   })
// }
//
// useIngredient = (name, amountToUse) => {
//   let curIngredient = null;
//   let curIndex = null;
//   this.ingredients.find((ingredient, index) => {
//     if (ingredient.name === name) {
//       ingredient.amount -= amountToUse
//       curIngredient = ingredient;
//       curIndex = index
//     }
//   })
//   this.removeIngredientIfUsedUp(curIngredient, curIndex)
// }
//
// removeIngredientIfUsedUp = (ingredient, index) => {
//   if (ingredient.amount <= 0) {
//     this.ingredients.splice(index, 1)
//   }
// }

if (typeof module !== 'undefined') {
  module.exports = User;
}
