// populate recipe
// when a user clicks on a recipe card, figure out how to display full recipe

// variables
const recipeDisplay = document.querySelector('.recipe-list');
let listOfRecipes = recipeData.map(recipe => {
  let currentRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
  return currentRecipe;
});

// event listeners

recipeDisplay.addEventListener('click', displayFullRecipe);
window.onload = populateRecipes();

function findIngredientName(ingredientId) {
  let ingrName = ingredientsData.find(ingr => {
    if (ingredientId === ingr.id) {
      return ingr;
    }
  });
  return ingrName.name;
}

function populateRecipes() {
  clearRecipes();

  listOfRecipes.forEach((recipe, i) => {
    recipeDisplay.insertAdjacentHTML('beforeend',
    `
    <div data-id="${recipe.id}" class="recipe">
      <img src="${recipe.image}">
      <p>${recipe.name}</p>
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
    `;
  }
}

function contractMenu() {
  document.querySelectorAll('.ingredients').forEach(el => {
    el.innerHTML = '';
  });
  console.log(document.querySelectorAll('.ingredients'));
}










// randomized recipe for the feature?
// const findFeatureRecipe = () => {
//   let numOfRecipes = recipesData.length;
//   let randomIndex = Math.floor(Math.random() * numOfRecipes);
//   console.log(randomIndex)
// }
