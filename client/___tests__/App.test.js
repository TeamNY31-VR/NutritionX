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

  test('accepts user input and sends it in post request when user clicks add button', async () => {
    render(<AddRecipe />)
  });

  // describe('form component', () => {
  //   describe('<Buttons />', () => {
  //     test('3 buttons renders on page', () =>
  //       expect(screen.getAllByRole('button')).toHaveLength(3));
  //   });

  //   describe('<Typography />', () => {
  //     test('it renders h4 heading to the page', () =>
  //       expect(screen.getByRole('header')).toBeInTheDocument());
  //   });
  // });
});
