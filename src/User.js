const allIngredients = require('../data/ingredients');
const allRecipes = require('../data/recipes');
const allUsers = require('../data/users');
const Recipe = require('../src/Recipe');
const Pantry = require('../src/Pantry');
const Ingredient = require('../src/Ingredient');

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = this.fillPantry(pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  };

  fillPantry(pantry) {
    let pantryInfo = pantry.map(el => {
      let ingredient = new Ingredient(el.ingredient, el.amount)
      ingredient.findName();
      ingredient.findPrice();
      return ingredient;
    });
    let curPantry = new Pantry(pantryInfo);
    return curPantry;
  };

  addToFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  };

  removeFromFavoriteRecipes(recipe) {
    this.favoriteRecipes.forEach((currentRecipe, i) => {
      if (currentRecipe === recipe) {
        this.favoriteRecipes.splice(i, 1);
      }
    });
  };

  addToRecipesToCook(recipe) {
    this.recipesToCook.push(recipe);
  };

  filterByTag(tag) {
    let result = this.favoriteRecipes.filter(currentRecipe => {
      return currentRecipe.tags.includes(tag);
    });
    return result;
  };

  findRecipeByIngredients(searchTerm) {
    let ingredientId = null;
    allIngredients.forEach((ingredient, i) => {
      if (searchTerm.includes(ingredient.name)) {
        ingredientId = ingredient.id;
      }
    });
    let recipeList = [];
    this.favoriteRecipes.forEach(currentRecipe => {
      currentRecipe.ingredients.forEach(element => {
        if (ingredientId === element.id) {
          recipeList.push(currentRecipe);
        }
      });
    });
    return recipeList;
  };

  searchFavorites(searchTerm) {
    let result = this.favoriteRecipes.filter(currentRecipe => {
      return currentRecipe.name.includes(searchTerm);
    });
    if (result.length === 0) {
      return this.findRecipeByIngredients(searchTerm);
    }
    return result;
  };

};


if (typeof module !== 'undefined') {
  module.exports = User;
};
