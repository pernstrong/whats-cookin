const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');


describe('User', function() {

  let user1;
  let user2;

  beforeEach(function() {
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

  it('should be a function', function() {

  })

  it.skip('should be an instance of User', function() {

  })

  it.skip('should have a pantry containing ingredients,' function() {

  })

  it.skip('should be able to have favorite recipes', function() {

  })

  it.skip('should be able to add to their favorite recipes', function() {

  })

  it.skip('should be able to remove a recipe from their favorites', function() {

  })

  it.skip('should be able to decide on a recipe to cook', function() {

  })

  it.skip('should be able to filter their favorite recipes by type/tag', function() {

  })

  it.skip('should be able to search saved recipes by name or ingredient', function() {

  })




})
