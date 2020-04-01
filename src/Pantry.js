class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  checkPantry(recipe) {
    const recipeAmounts = recipe.returnIdAndAmount()
    const ingredientNumbers = recipeAmounts.reduce((acc, ingredient) => {
      this.ingredients.forEach(ing => {
        if (ing.id === ingredient.id && ing.quantity >= ingredient.amount) {
          acc.push(1);
        }
      });
      return acc;
    }, []);
    if (recipeAmounts.length === ingredientNumbers.length) {
      return true;
    } else {
      return false;
    }
  }

  findMissingIngredients(recipeAmounts) {
    return recipeAmounts.map(recipeIngredient => {
      return this.ingredients.find(pantryIngredient => {
        return (pantryIngredient.id === recipeIngredient.id);
      });
    });
  }

  findIngredientsNeeded(recipe) {
    const recipeAmounts = recipe.returnIdAndAmount();
    const ingredientsHaveAndNeeded = this.findMissingIngredients(recipeAmounts);
    const ingredientAndDifference = ingredientsHaveAndNeeded.reduce((acc, recipeIngredient, i) => {
      if (recipeIngredient === undefined) {
        let amountNeeded = {};
        amountNeeded['id'] = recipeAmounts[i].id;
        amountNeeded['amount'] = recipeAmounts[i].amount;
        acc.push(amountNeeded);
      } else {
        recipeAmounts.forEach(ingredient => {
          if (recipeIngredient.id === ingredient.id) {
            let amountNeeded = {};
            amountNeeded['id'] = ingredient.id;
            amountNeeded['amount'] = ingredient.amount - recipeIngredient.quantity;
            acc.push(amountNeeded);
          }
        });
      }
      return acc;
    }, []);
    return ingredientAndDifference.reduce((acc, ingredient) => {
      if (ingredient.amount > 0) {
        acc.push(ingredient);
      }
      return acc;
    }, []);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
