// DOM variables
const search = document.querySelector('#searchbar');
const recipeDisplay = document.querySelector('.recipe-list');
const myPantryButton = document.querySelector('.display-pantry-button');
const pantryDisplaySection = document.querySelector('.pantry-display-section');
const searchAllBtn = document.querySelector('#search-all');
const searchFavoritesBtn = document.querySelector('#search-favorites');
const header = document.querySelector('#header');
const filterDisplaySection = document.querySelector('.filter-dropdown');

// variables
let listOfRecipes = recipeData.map(recipe => {
  let currentRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
  return currentRecipe;
});
let user;

// event listeners
window.onload = createUser(), populateRecipes(listOfRecipes);
search.addEventListener('keyup', repopulate);
searchAllBtn.addEventListener('click', searchAllRecipes);
searchFavoritesBtn.addEventListener('click', searchFavorites);

// EP for main area
recipeDisplay.addEventListener('click', function(e) {
  if (e.target.matches('.checkbox')) {
    selectFavoriteRecipe(e);
  } else if (e.target.matches('.check-pantry')) {
    checkPantry(e);
  } else if (e.target.matches('.meal-to-cook')) {
    addRecipeToCook(e);
  } else if (e.target.closest('.recipe') || e.target.closest('.recipe img')) {
    displayFullRecipe(e);
  }
});

// EP for header
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

// find Ingredients name by ID
function findIngredientName(ingredientId) {
  let ingrName = ingredientsData.find(ingr => {
    if (ingredientId === ingr.id) {
      return ingr;
    }
  });
  return ingrName.name;
}

// clear out the main area
function clearDisplay() {
  document.querySelectorAll('.recipe').forEach(item => {
    item.remove();
  });
}

// display all recipes
function populateRecipes(list = listOfRecipes) {
  clearDisplay();
  list.forEach(recipe => {
    let image = "../assets/checkbox.svg"
    if (user.favoriteRecipes.length > 0) {
      user.favoriteRecipes.forEach(favRecipe => {
        if (recipe.id === favRecipe.id) {
          image = "../assets/checkbox-active.svg"
        }
      })
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


// redisplay all recipes
function repopulate() {
  if (search.value === '') {
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

// dipslay ingredients and instructions
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
      <p class="recipe-name">${selectedRecipe.name}</p>
      <p class="instructions-p">Ingredients</p>
      <ul class="ingredients">
        ${displayIngredients(selectedRecipe.ingredients)}
      </ul>
      <p class="instructions-p">Instructions</p>
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

// collapse ingredients and instructions
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
  document.querySelectorAll('.ingredients-p').forEach(el => {
    el.innerHTML = '';
  })
  document.querySelectorAll('.instructions-p').forEach(el => {
    el.innerHTML = '';
  })
}

// add recipe to user favorites
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

// search just favorite recipes
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

// search all recipes
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

// search all recipes by name
function searchAllRecipesByName(searchInput) {
  searchInput.toLowerCase();
  let result = listOfRecipes.filter(currentRecipe => {
    return currentRecipe.name.toLowerCase().includes(searchInput);
  });
  return result;
}

// search all recipes by ingredient
function searchAllRecipesByIngredients(searchInput) {
  let ingredientId = null;
  allIngredients.forEach((ingredient) => {
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

// display users pantry
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

// display ingredients in users pantry
function displayPantryIngredients(ingr) {
  ingr.sort((a, b) => a.name - b.name);
  return ingr.reduce((acc, currIngr) => {
    let ingrListItem = `<li><strong>${currIngr.name}</strong> = ${currIngr.quantity}</li>`
    acc += ingrListItem;
    return acc;
  }, ``);
}

// check to see if pantry has enough ingredients for a given recipe
function checkPantry(e) {
  let selectedRecipe = findSelectedRecipe(e);
  if (user.pantry.checkPantry(selectedRecipe)) {
    window.alert(`Yes, you have enough ingredients in the pantry to make ${selectedRecipe.name}`)
  } else {
    const missingIngredients = user.pantry.findIngredientsNeeded(selectedRecipe)
    const listOfMissing = missingIngredients.map(ingredient => {
      return ` ${ingredient.amount} of ${findIngredientName(ingredient.id)}`
    });
    window.alert(`You do not have enough ingredients to make ${selectedRecipe.name}.
    You will need the following: ${listOfMissing}`);
  }
}

// add recipe to cook, for future iterations
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

// display recipe types/tags
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

// find recipes by type/tag
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

// display recipes by type/tag
function filterRecipeByType() {
  const tag = filterDisplaySection.value
  let recipesByType = allRecipes.filter(currentRecipe => {
    return currentRecipe.tags.includes(tag);
  });
  console.log(recipesByType)
  populateRecipes(recipesByType)
}
