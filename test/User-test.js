const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');


describe('User', () => {

  let user1;
  let user2;

  beforeEach( () => {
    user1 = {
      id: 12,
      name: 'Elliot',
      pantry: []
    }
    user2 = {
      id: 14,
      name: 'Dave',
      pantry: [];
    }
  })

  it('should be a function', () => {

  })

  it.skip('should be an instance of User', () => {

  })

  it.skip('should have a pantry containing ingredients,' () => {

  })

  it.skip('should be able to have favorite recipes', () => {

  })

  it.skip('should be able to add to their favorite recipes', () => {

  })

  it.skip('should be able to remove a recipe from their favorites', () => {

  })

  it.skip('should be able to decide on a recipe to cook', () => {

  })

  it.skip('should be able to filter their favorite recipes by type/tag', () => {

  })

  it.skip('should be able to search saved recipes by name or ingredient', () => {

  })




})
