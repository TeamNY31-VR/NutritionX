import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import AddRecipe from '../Components/AddRecipe';
import { render, fireEvent, screen }from './test-utils';


describe('<AddRecipe /> component', () => {
  const initialState = {
    recipes: [],
    newRecipeName: '',
    newIngredientsList: '',
    gotRecipes: false,
  };

  const handlers = [
    rest.post('/recipes/', (req, res, ctx) => {
      return res(ctx.json('Added'), ctx.delay(150))
    })
  ]
  
  const server = setupServer(...handlers)

  beforeAll(() => server.listen());

  beforeEach(() => server.resetHandlers());

  afterAll(() => server.close())

  test('displays form, accepts user input, and sends it in post request when user clicks add button', async () => {
    render(<AddRecipe />)
    
    // form elements renders to screen properly
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Name' })).value.toBe('');

    // form accepts user input

    // after clicking 'add', it should recept input form

    // after some time, a 200 response should be received

  });
  
});
