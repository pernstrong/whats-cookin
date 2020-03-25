const chai = require('chai');
const expect = chai.expect;
const usersData = require('../data/users');
const allRecipes = require('../data/recipes');
const User = require('../src/User');
const Recipe = require('../src/Recipe');

describe('User', () => {

  let user1;
  let user2;
  let recipe1;
  let recipe2;
  let recipe3;

  beforeEach( () => {
    user1 = new User(usersData[0].name, usersData[0].id, usersData[0].pantry);
    user2 = new User(usersData[1].name, usersData[1].id, usersData[1].pantry);
    recipe1 = new Recipe(allRecipes[0].id, allRecipes[0].image, allRecipes[0].ingredients, allRecipes[0].instructions, allRecipes[0].name, allRecipes[0].tags);
    recipe2 = new Recipe(allRecipes[1].id, allRecipes[1].image, allRecipes[1].ingredients, allRecipes[1].instructions, allRecipes[1].name, allRecipes[1].tags);
    recipe3 = new Recipe(allRecipes[2].id, allRecipes[2].image, allRecipes[2].ingredients, allRecipes[2].instructions, allRecipes[2].name, allRecipes[2].tags);
    recipe4 = new Recipe(allRecipes[13].id, allRecipes[13].image, allRecipes[13].ingredients, allRecipes[13].instructions, allRecipes[13].name, allRecipes[13].tags);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have a name', () => {
    expect(user1.name).to.equal('Saige O\'Kon');
    expect(user2.name).to.equal('Ephraim Goyette');
  });

  it('should have an ID', () => {
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it('should have a pantry containing ingredients', () => {
    expect(user1.pantry.length).to.equal(36);
    expect(user2.pantry.length).to.equal(58);
  });

  it('should be able to add to their favorite recipes', () => {
    user1.addToFavoriteRecipes(recipe1);
    expect(user1.favoriteRecipes[0]).to.deep.equal(recipe1);
    expect(user1.favoriteRecipes[0].name).to.deep.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should be able to remove a recipe from their favorites', () => {
    user1.addToFavoriteRecipes(recipe1);
    user1.addToFavoriteRecipes(recipe2);
    user1.addToFavoriteRecipes(recipe3);
    expect(user1.favoriteRecipes).to.deep.equal([recipe1, recipe2, recipe3]);

    user1.removeFromFavoriteRecipes(recipe2);
    expect(user1.favoriteRecipes).to.deep.equal([recipe1, recipe3]);
  });

  it('should be able to decide on a recipe to cook', () => {
    user1.addToRecipesToCook(recipe1);
    expect(user1.recipesToCook).to.deep.equal([recipe1]);
  });

  it('should be able to filter their favorite recipes by type/tag', () => {
    user1.addToFavoriteRecipes(recipe1);
    user1.addToFavoriteRecipes(recipe2);
    user1.addToFavoriteRecipes(recipe3);
    user1.addToFavoriteRecipes(recipe4);
    expect(user1.filterByTag('main dish')).to.deep.equal([recipe2, recipe4]);
  });

  it.skip('should be able to search saved recipes by name or ingredient', () => {
    user1.addToFavoriteRecipes(recipe1);
    user1.addToFavoriteRecipes(recipe2);
    user1.addToFavoriteRecipes(recipe3);
    user1.addToFavoriteRecipes(recipe4);
    expect(user1.searchFavorites('Dirty Steve\'s Original Wing Sauce')).to.deep.equal(recipe3);
  });

})
