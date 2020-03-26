// populate recipe
// when a user clicks on a recipe card, figure out how to display full recipe
const recipeDisplay = document.querySelector('.recipe-list');

window.onload = populateRecipes();

function populateRecipes() {
  recipeData.forEach((recipe, i) => {
    recipeDisplay.insertAdjacentHTML('beforeend',
    `
    <div class="recipe">
      <img src="${recipe.image}">
      <p>${recipe.name}</p>
    </div>
    `)
  });

}














// randomized recipe for the feature?
// const findFeatureRecipe = () => {
//   let numOfRecipes = recipesData.length;
//   let randomIndex = Math.floor(Math.random() * numOfRecipes);
//   console.log(randomIndex)
// }
