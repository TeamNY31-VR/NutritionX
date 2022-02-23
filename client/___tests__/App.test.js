import React from 'react'
import AddRecipe from '../Components/AddRecipe'
import renderConnected from './test-utils';



describe('<AddRecipe /> component', () => {
  let wrapper, getByText;
  const initialState = {
    recipes: [],
    newRecipeName: '',
    newIngredientsList: '',
    gotRecipes: false,
  }

  beforeEach(()=> {
    const utils = renderConnected(<AddRecipe />, {initialState});
    wrapper = utils.container;
    getByText = utils.getByText;
  })

  test('it renders', () => {
    expect(wrapper.querySelector('#AddRecipe')).toBeInTheDocument();
  });

  describe('form component', () => {
   describe('<Button />', () => {
    test('it renders on page', () => 
      expect(wrapper.querySelector('button')).toBeInTheDocument())
    
    test('it renders on page', () => 
      expect(wrapper.querySelector('button')).toBeInTheDocument())
    })   
  })
})


