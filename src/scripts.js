// variables
const recipeDisplay = document.querySelector('.recipe-list');
let listOfRecipes = recipeData.map(recipe => {
  let currentRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
  return currentRecipe;
});
let user;

let ingredient = new Ingredient(1, 'apple', 4, 25);

// event listeners
recipeDisplay.addEventListener('click', displayFullRecipe);
window.onload = populateRecipes();

function createUser() {
  let randomNum = Math.floor((Math.random() * 49));
  user = new User(userData[randomNum].name, userData[randomNum].id, userData[randomNum].pantry);
}

function findIngredientName(ingredientId) {
  let ingrName = ingredientsData.find(ingr => {
    if (ingredientId === ingr.id) {
      return ingr;
    }
  });
  return ingrName.name;
}

function populateRecipes() {
  listOfRecipes.forEach((recipe, i) => {
    recipeDisplay.insertAdjacentHTML('beforeend',
    `
    <div data-id="${recipe.id}" class="recipe">
      <img class="picture" src="${recipe.image}">
      <p>${recipe.name}</p>
      <img class="checkbox ${recipe.id}" src="../assets/checkbox.svg">
    </div>
    `);
  });
}

function displayIngredients(ingr) {
  return ingr.reduce((acc, currIngr, i) => {
    let name = findIngredientName(currIngr.id);
    let amount = currIngr.quantity.amount;
    let unit = currIngr.quantity.unit;
    let ingrListItem = `<li>${amount} ${unit} ${name}</li>`
    acc += ingrListItem;
    return acc;
  }, ``);
}

function displayInstructions(instr) {
  return instr.reduce((acc, currInstr, i) => {
    let number = currInstr.number;
    let instruction = currInstr.instruction;
    let instrListItem = `<li>${number}: ${instruction}</li>`
    acc += instrListItem;
    return acc;
  }, ``);
}

function displayFullRecipe(e) {
  if (e.target.closest('.recipe')) {
    let selectedRecipe = listOfRecipes.find(recipe => {
      if (recipe.id === Number(e.target.dataset.id) || recipe.id === Number(e.target.parentNode.dataset.id)) {
        return recipe;
      }
    });
    contractMenu();

    e.target.closest('.recipe').innerHTML = `
      <img src="${selectedRecipe.image}">
      <p>${selectedRecipe.name}</p>
      <ul class="ingredients">
        ${displayIngredients(selectedRecipe.ingredients)}
      </ul>
      <ul class="instructions">
        ${displayInstructions(selectedRecipe.instructions)}
      </ul>
      <img class="checkbox ${selectedRecipe.id}" src="../assets/checkbox.svg">
    `;
  }
}

function contractMenu() {
  document.querySelectorAll('.ingredients').forEach(el => {
    el.innerHTML = '';
  });
  document.querySelectorAll('.instructions').forEach(el => {
    el.innerHTML = '';
  });
}

function displayFavorites() {

}

// click on checkbox, it finds recipe and adds to favorites
// changes the checkbox image
// when

// function iterates favs
// pulls out id save in variable
// 595736
// recipe card with the dataset 595736, your checkbox is now active





// randomized recipe for the feature?
// const findFeatureRecipe = () => {
//   let numOfRecipes = recipesData.length;
//   let randomIndex = Math.floor(Math.random() * numOfRecipes);
//   console.log(randomIndex)
// }
