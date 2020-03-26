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
  }

  searchFavorites(searchTerm) {
    let result = this.favoriteRecipes.filter(currentRecipe => {
        return currentRecipe.name.includes(searchTerm);
    });
    if (result.length === 0) {
      return this.findRecipeByIngredients(searchTerm);
    }
    return result;
  }

  checkPantry = (recipe) => {
    const recipeAmounts = this.findRecipeIdsAndAmounts(recipe)
    const pantryAmounts = this.findPantryIdsAndAmounts(recipe)
    const ingredientNumbers = recipeAmounts.reduce((acc, ingredient) => {
      pantryAmounts.forEach(ing => {
        if (ing.id === ingredient.id && ing.amount >= ingredient.amount) {
          acc.push(1)
        }
      })
      return acc
      }, [])
      if (recipeAmounts.length === ingredientNumbers.length) {
        return true;
      } else {
        return false;
      }
    }

    findRecipeIdsAndAmounts = (recipe) => {
      return recipe.ingredients.reduce((acc, ingredient) => {
          let idIng = {};
          idIng['id'] = ingredient.id;
          idIng['amount'] = ingredient.quantity.amount;
          acc.push(idIng);
          return acc;
        }, [])
      }

    findPantryIdsAndAmounts = (recipe) => {
      return this.pantry.reduce((acc, curIngredient) => {
        let idIng = {};
        idIng['id'] = curIngredient.ingredient;
        idIng['amount'] = curIngredient.amount;
        acc.push(idIng);
        return acc;
      }, [])
    }

    createArrayOfIngredientsHaveAndNeeded = (recipeAmounts, pantryAmounts) => {
      return recipeAmounts.map(recipeIngredient => {
        return pantryAmounts.find(pantryIngredient => {
          return (pantryIngredient.id === recipeIngredient.id)
          })
        })
      }

      


    findIngredientsNeeded = (recipe) => {
      const recipeAmounts = this.findRecipeIdsAndAmounts(recipe)
      const pantryAmounts = this.findPantryIdsAndAmounts(recipe)
      const ingredientsHaveAndNeeded = this.createArrayOfIngredientsHaveAndNeeded(recipeAmounts, pantryAmounts)
      const ingredientAndDifference = ingredientsHaveAndNeeded.reduce((acc, recipeIngredient, i) => {
        if (recipeIngredient === undefined) {
          let amountNeeded = {};
          amountNeeded['id'] = recipeAmounts[i].id;
          amountNeeded['amount'] = recipeAmounts[i].amount
          acc.push(amountNeeded)
        } else {
          recipeAmounts.forEach(ingredient => {
            if (recipeIngredient.id === ingredient.id) {
              let amountNeeded = {};
              amountNeeded['id'] = ingredient.id;
              amountNeeded['amount'] = ingredient.amount - recipeIngredient.amount
              acc.push(amountNeeded)
            }
          })
        }
        return acc
      }, [])
      return ingredientAndDifference.reduce((acc, ingredient) => {
        if (ingredient.amount > 0) {
          acc.push(ingredient)
        }
        return acc
      }, [])
    }
}


if (typeof module !== 'undefined') {
  module.exports = User;
}
