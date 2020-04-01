class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  getInstructions() {
    return this.instructions;
  }

  findTotalCost() {
    let totalCost = 0;
    this.ingredients.forEach(currentIngredient => {
      allIngredients.forEach(ingredient => {
        if (currentIngredient.id === ingredient.id) {
          totalCost += (ingredient.estimatedCostInCents * currentIngredient.quantity.amount);
        }
      });
    });
    return totalCost;
  }

  returnIdAndAmount() {
    return this.ingredients.reduce((acc, ingredient) => {
      let idIng = {};
      idIng['id'] = ingredient.id;
      idIng['amount'] = ingredient.quantity.amount;
      acc.push(idIng);
      return acc;
    }, []);
  }

}


if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
