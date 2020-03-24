class Ingredient {
  constructor(id, name, price, amount) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
  // cant decide on add in ingredient or pantry...
  // leaning towards amount here, but add/remove in pantry
  // add(amountAdded) {
  //   this.amount += amountAdded;
  // }
  //
  // use(amountUsed) {
  //   this.amount -= amountUsed;
  // }

}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
}
