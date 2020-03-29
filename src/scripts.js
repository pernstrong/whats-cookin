// variables
const recipeDisplay = document.querySelector('.recipe-list');
let listOfRecipes = recipeData.map(recipe => {
  let currentRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
  return currentRecipe;
});
let user;

let ingredient = new Ingredient(1, 'apple', 4, 25);

// event listeners
window.onload = populateRecipes(), createUser();
recipeDisplay.addEventListener('click', function(e) {
  if (e.target.matches('.checkbox')) {
    selectFavoriteRecipe(e)
  } else if (e.target.closest('.recipe')) {
    displayFullRecipe(e)
  }
});

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

function populateRecipes() {
  listOfRecipes.forEach((recipe, i) => {
    recipeDisplay.insertAdjacentHTML('beforeend',
      `
    <div data-id="${recipe.id}" class="recipe">
      <img class="picture" src="${recipe.image}">
      <p>${recipe.name}</p>
      <img class="checkbox" data-id="${recipe.id}" src="../assets/checkbox.svg">
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
  // let recipeDiv = e.target.closest('.recipe')
  if (e.target.closest('.recipe')) {
    let selectedRecipe = listOfRecipes.find(recipe => {
      if (recipe.id === Number(e.target.dataset.id) || recipe.id === Number(e.target.parentNode.dataset.id)) {
        return recipe;
      }
    });
    contractMenu();
    let image;
    console.log(e.target.classList)
    if (e.target.closest('.recipe').classList.contains('selected')) {
      image = "../assets/checkbox-active.svg"
    } else {
      image = "../assets/checkbox.svg"
    }
    console.log(image)
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

function displayFavorites() {
  // tied to button that hides non-favorited recipe.
}

function selectFavoriteRecipe(e) {
  console.log(e.target)
  // console.log(e.target.dataset.id)
  // let target = e.target
  // if (e.target.matches('.checkbox')) {
    console.log('checkbox')
    allRecipes.forEach(recipe => {
      // console.log(typeof recipe.id)
      // console.log(typeof e.target.dataset.id)
      if (recipe.id === Number(e.target.dataset.id)) {
        console.log(e.target.src)
        if (user.favoriteRecipes.includes(recipe)) {
          e.target.closest('.recipe').classList.remove('selected')
          e.target.setAttribute('src', '../assets/checkbox.svg');
          user.removeFromFavoriteRecipes(recipe)
          // return '../assets/checkbox.svg'
        } else {
          e.target.closest('.recipe').classList.add('selected')
          // console.log(e.target.closest('.recipe'))
          e.target.setAttribute('src', '../assets/checkbox-active.svg');
          user.addToFavoriteRecipes(recipe)
          // return '../assets/checkbox-active.svg'
        }

      }
    })
  // }

}


// set variable/event listener for checkbox.

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
