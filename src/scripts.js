// variables
const search = document.querySelector('#searchbar');
const recipeDisplay = document.querySelector('.recipe-list');
let listOfRecipes = recipeData.map(recipe => {
  let currentRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
  return currentRecipe;
});
let user;

let ingredient = new Ingredient(1, 'apple', 4, 25);

// event listeners
window.onload =  createUser(), populateRecipes(listOfRecipes);
recipeDisplay.addEventListener('click', function(e) {
  if (e.target.matches('.checkbox')) {
    selectFavoriteRecipe(e)
  } else if (e.target.closest('.recipe')) {
    displayFullRecipe(e)
  }
});
search.addEventListener('keyup', searchFavorites);
search.addEventListener('click', searchFavorites);

function createUser() {
  let randomNum = Math.floor((Math.random() * 49));
  user = new User(usersData[randomNum].name, usersData[randomNum].id, usersData[randomNum].pantry);
  return user;
}

function findIngredientName(ingredientId) {
  let ingrName = ingredientsData.find(ingr => {
    if (ingredientId === ingr.id) {
      return ingr;
    }
  });
  return ingrName.name;
}

function clearDisplay() {
  document.querySelectorAll('.recipe').forEach(item => {
    item.remove();
  });
}

function populateRecipes(list) {
  clearDisplay();
  let image;
  list.forEach((recipe, i) => {
    if (user.favoriteRecipes.includes(recipe)) {
      image = "../assets/checkbox-active.svg"
    } else {
      image = "../assets/checkbox.svg"
    }
    recipeDisplay.insertAdjacentHTML('beforeend',
      `
    <div data-id="${recipe.id}" class="recipe">
      <img class="picture" src="${recipe.image}">
      <p>${recipe.name}</p>
      <img class="checkbox" data-id="${recipe.id}" src=${image}>
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
    let image;
    document.querySelectorAll('.recipe').forEach(item => {
      user.favoriteRecipes.forEach(recipe => {
        if (Number(item.dataset.id) === recipe.id) {
          item.classList.add('selected');
        }
      });

    });
    if (e.target.closest('.recipe').classList.contains('selected')) {
      image = "../assets/checkbox-active.svg"
    } else {
      image = "../assets/checkbox.svg"
    }
    e.target.closest('.recipe').innerHTML = `
      <img src="${selectedRecipe.image}">
      <p>${selectedRecipe.name}</p>
      <ul class="ingredients">
        ${displayIngredients(selectedRecipe.ingredients)}
      </ul>
      <ul class="instructions">
        ${displayInstructions(selectedRecipe.instructions)}
      </ul>
      <img class="checkbox" data-id="${selectedRecipe.id}" src=${image}>
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

function selectFavoriteRecipe(e) {
  allRecipes.forEach(recipe => {
    if (recipe.id === Number(e.target.dataset.id)) {
      if (user.favoriteRecipes.includes(recipe)) {
        e.target.closest('.recipe').classList.remove('selected')
        e.target.setAttribute('src', '../assets/checkbox.svg');
        user.removeFromFavoriteRecipes(recipe)
      } else {
        e.target.closest('.recipe').classList.add('selected')
        e.target.setAttribute('src', '../assets/checkbox-active.svg');
        user.addToFavoriteRecipes(recipe)
      }
    }
  });
}

function searchFavorites(searchInput) {
  searchInput = search.value;
  clearDisplay();
  if (!user.searchFavorites(searchInput)) {
    populateRecipes(user.findRecipeByIngredients(searchInput));
  } else {
    populateRecipes(user.searchFavorites(searchInput));
  }
  document.querySelectorAll('.recipe').forEach(item => {
    item.classList.add('selected');
  });
  if (searchInput === '') {
    populateRecipes(allRecipes);
  }
}

function searchAllRecipes() {
  
}
// update searchFavorites to work with names and tag of recipes
// make a search function that works all recipes
// make 2 buttons: one for searchFavorites, one for search all recipes
// figure out how to check if enough ingredients for recipe (alert window)
// display cost of recipe ingredients
// recipes to cook implementation


// randomized recipe for the feature?
// const findFeatureRecipe = () => {
//   let numOfRecipes = recipesData.length;
//   let randomIndex = Math.floor(Math.random() * numOfRecipes);
//   console.log(randomIndex)
// }
