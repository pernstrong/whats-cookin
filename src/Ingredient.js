
class Ingredient {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity || null;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
}
