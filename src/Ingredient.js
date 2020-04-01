if (typeof module !== 'undefined') {
  allIngredients = require('../data/ingredients');
} else {
  allIngredients = ingredientsData;
}

class Ingredient {
  constructor(id, quantity, name, price) {
    this.id = id;
    this.quantity = quantity || null;
    this.name = name;
    this.price = price;
  };

  findName() {
      allIngredients.forEach(ingr => {
      if (this.id === ingr.id) {
        this.name = ingr.name;
      }
    });
  };

  findPrice() {
      allIngredients.forEach(ingr => {
      if (this.id === ingr.id) {
        this.price = ingr.estimatedCostInCents;
      }
    });
  };

};

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
