// DOM variables
const search = document.querySelector('#searchbar');
const recipeDisplay = document.querySelector('.recipe-list');
const myPantryButton = document.querySelector('.display-pantry-button');
const pantryDisplaySection = document.querySelector('.pantry-display-section');
const searchAllBtn = document.querySelector('#search-all');
const searchFavoritesBtn = document.querySelector('#search-favorites');
const header = document.querySelector('#header');
const filterDisplaySection = document.querySelector('.filter-dropdown');
const clearFilterButton = document.querySelector('.clear-filter');
const filterRecipeButton = document.querySelector('.filter-by-type');

// variables
let listOfRecipes = recipeData.map(recipe => {
  let currentRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
  return currentRecipe;
});
let user;

// event listeners
window.onload = createUser(), populateRecipes(listOfRecipes);
recipeDisplay.addEventListener('click', function(e) {
  if (e.target.matches('.checkbox')) {
    selectFavoriteRecipe(e);
  } else if (e.target.matches('.check-pantry')) {
    checkPantry(e);
  } else if (e.target.matches('.meal-to-cook')) {
    addRecipeToCook(e);
  } else if (e.target.closest('.recipe')) {
    displayFullRecipe(e);
  }
});
searchFavoritesBtn.addEventListener('keyup', searchFavorites);
searchAllBtn.addEventListener('click', searchAllRecipes);
myPantryButton.addEventListener('click', displayPantry);
filterDisplaySection.addEventListener('click', displayRecipeTypes);
filterRecipeButton.addEventListener('click', filterRecipeByType);
clearFilterButton.addEventListener('click', populateRecipes);

header.addEventListener('click', function(e) {
  if (e.target.matches('.display-pantry-button')) {
    displayPantry();
  } else if (e.target.matches('.filter-dropdown')) {
    displayRecipeTypes();
  } else if (e.target.matches('.filter-by-type')) {
    filterRecipeByType();
  } else if (e.target.matches('.clear-filter')) {
    populateRecipes(listOfRecipes);
  }
});

// generate random user
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

function populateRecipes(list = listOfRecipes) {
  clearDisplay();
  let image;
  list.forEach((recipe) => {
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
      <section class="add-favorite-section" data-id="${recipe.id}">
      <p>Favorite</p>
      <img class="checkbox" data-id="${recipe.id}" src=${image}>
      <button class='check-pantry'>Check Pantry</button>
      <button class='meal-to-cook'>Meal To Cook</button>
      </section>
    </div>
    `);
  });
}

function repopulate() {
  if (search.value == '') {
    populateRecipes(listOfRecipes);
  }
}

// display ingredients upon click
function displayIngredients(ingr) {
  return ingr.reduce((acc, currIngr) => {
    let name = findIngredientName(currIngr.id);
    let amount = currIngr.quantity.amount;
    let unit = currIngr.quantity.unit;
    let ingrListItem = `<li>${amount} ${unit} ${name}</li>`
    acc += ingrListItem;
    return acc;
  }, ``);
}

// display ingredients upon click
function displayInstructions(instr) {
  return instr.reduce((acc, currInstr) => {
    let instruction = currInstr.instruction;
    let instrListItem = `<li> ${instruction}</li>`
    acc += instrListItem;
    return acc;
  }, ``);
}

//
function displayFullRecipe(e) {
  if (e.target.closest('.recipe')) {
    let selectedRecipe = findSelectedRecipe(e)
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
      image = "../assets/checkbox-active.svg";
    } else {
      image = "../assets/checkbox.svg";
    }
    e.target.closest('.recipe').innerHTML = `
      <img src="${selectedRecipe.image}">
      <p>${selectedRecipe.name}</p>
      <p>Ingredients</p>
      <ul class="ingredients">
        ${displayIngredients(selectedRecipe.ingredients)}
      </ul>
      <p>Instructions</p>
      <ol class="instructions">
        ${displayInstructions(selectedRecipe.instructions)}
      </ol>
      <section class="add-favorite-section" data-id="${selectedRecipe.id}">
      <p>Favorite</p>
      <img class="checkbox" data-id="${selectedRecipe.id}" src=${image}>
      <button class='check-pantry'>Check Pantry</button>
      <button class='meal-to-cook'>Meal To Cook</button>
      </section>
      <p class="total-cost">Total Cost: $${parseInt(selectedRecipe.findTotalCost() / 100)}</p>
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
  document.querySelectorAll('.total-cost').forEach(el => {
    el.innerHTML = '';
  })
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
  searchInput = search.value.toLowerCase();
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

function searchAllRecipes(searchInput) {
  searchInput = search.value.toLowerCase();
  clearDisplay();
  if (!searchAllRecipesByName(searchInput)) {
    populateRecipes(searchAllRecipesByIngredients(searchInput));
  } else {
    populateRecipes(searchAllRecipesByName(searchInput));
  }
  if (searchInput === '') {
    populateRecipes(allRecipes);
  }
}

function searchAllRecipesByName(searchInput) {
  searchInput.toLowerCase();
  let result = listOfRecipes.filter(currentRecipe => {
    return currentRecipe.name.toLowerCase().includes(searchInput);
  });
  return result;
}

function searchAllRecipesByIngredients(searchInput) {
  let ingredientId = null;
  allIngredients.forEach((ingredient, i) => {
    if (searchInput.includes(ingredient.name)) {
      ingredientId = ingredient.id;
    }
  });
  let recipeList = [];
  allRecipes.forEach(currentRecipe => {
    currentRecipe.ingredients.forEach(element => {
      if (ingredientId === element.id) {
        recipeList.push(currentRecipe);
      }
    });
  });
  return recipeList;
}

// display pantry
function displayPantry() {
  myPantryButton.classList.toggle('pantry-active');
  if (myPantryButton.classList.contains('pantry-active')) {
    pantryDisplaySection.innerHTML = `
      <h2>My Pantry</h2>
      <ul class='pantry-ingredients'>
        ${displayPantryIngredients(user.pantry.ingredients)}
      </ul>
    `;
  } else {
    pantryDisplaySection.innerHTML = '';
  }
}

function displayPantryIngredients(ingr) {
  ingr.sort((a, b) => a.name - b.name);
  return ingr.reduce((acc, currIngr, i) => {
    let ingrListItem = `<li><strong>${currIngr.name}</strong> = ${currIngr.quantity}</li>`
    acc += ingrListItem;
    return acc;
  }, ``);
}

function checkPantry(e) {
  let selectedRecipe = findSelectedRecipe(e);
  if (user.pantry.checkPantry(selectedRecipe)) {
    window.alert(`Yes, you have enough ingredients in the pantry to make ${selectedRecipe.name}`)
  } else {
    const missingIngredients = user.pantry.findIngredientsNeeded(selectedRecipe)
    const listOfMissing = missingIngredients.map(ingredient => {
      return ` ${ingredient.amount} of ${findIngredientNameById(ingredient.id)}`
    });
    window.alert(`You do not have enough ingredients to make ${selectedRecipe.name}.
    You will need the following: ${listOfMissing}`);
  }
}

function findIngredientNameById(id) {
  let ingredientName;
  allIngredients.forEach(ingredient => {
    if (ingredient.id === id) {
      ingredientName = ingredient.name;
    }
  });
  return ingredientName;
}

function addRecipeToCook(e) {
  let selectedRecipe = findSelectedRecipe(e);
  user.addToRecipesToCook(selectedRecipe);
}

// helper function for selectedRecipe
function findSelectedRecipe(e) {
  let selectedRecipe = listOfRecipes.find(recipe => {
    if (recipe.id === Number(e.target.dataset.id) || recipe.id === Number(e.target.parentNode.dataset.id)) {
      return recipe;
    }
  });
  return selectedRecipe;
}

function displayRecipeTypes() {
  const allTags = findRecipeTags();
  filterDisplaySection.innerHTML = ''
  allTags.sort((a, b) => a < b)
  allTags.forEach(tag => {
    filterDisplaySection.insertAdjacentHTML('beforeend',
      `<option value="${tag}">${tag}</option>
    `)
  })
}

function findRecipeTags() {
  return listOfRecipes.reduce((allTags, recipe) => {
    recipe.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag)
      }
    })
    return allTags
  }, [])
}

function filterRecipeByType() {
  const tag = filterDisplaySection.value
  let recipesByType = allRecipes.filter(currentRecipe => {
    return currentRecipe.tags.includes(tag);
  });
  console.log(recipesByType)
  populateRecipes(recipesByType)
}
