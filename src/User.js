let allUsers;
let allIngredients;
let allRecipes;
if (typeof module !== 'undefined') {
  Recipe = require('../src/Recipe');
  Pantry = require('../src/Pantry');
  Ingredient = require('../src/Ingredient');
  allUsers = require('../data/users')
  allIngredients = require('../data/ingredients');
  allRecipes = require('../data/recipes')
} else {
  allRecipes = recipeData;
  allIngredients = ingredientsData
  allUsers = usersData
}

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = this.fillPantry(pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  fillPantry(pantry) {
    let pantryInfo = pantry.map(el => {
      let ingredient = new Ingredient(el.ingredient, el.amount)
      ingredient.findName();
      ingredient.findPrice();
      return ingredient;
    });
    let curPantry = new Pantry(pantryInfo);
    return curPantry;
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

  findRecipeByIngredients(searchTerm) {
    let ingredientId = null;
    allIngredients.forEach((ingredient) => {
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
  }

  searchFavorites(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    let result = this.favoriteRecipes.filter(currentRecipe => {
      return currentRecipe.name.toLowerCase().includes(searchTerm);
    });
    if (result.length === 0) {
      return this.findRecipeByIngredients(searchTerm);
    }
    return result;
  }
}


if (typeof module !== 'undefined') {
  module.exports = User
}
