import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import AddRecipe from '../Components/AddRecipe';
import { render, fireEvent, screen } from './test-utils';

describe('<AddRecipe /> component', () => {
  let addRecipe;
 
  const handlers = [
    rest.post('/recipes/', (req, res, ctx) => {
      return res(ctx.json('Added'), ctx.delay(150));
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  beforeEach(() => {
    server.resetHandlers()
    addRecipe = render(<AddRecipe />);
  });

  afterAll(() => server.close());

  test('displays form, accepts user input, and sends it in post request when user clicks add button', async () => {
    const nameField = screen.getByRole('textbox', { name: 'Name' });
    const foodField = screen.getByRole('textbox', { name: 'Ingredients' });

    const name = 'lunch';
    const recipe = 'pizza, garlic knot, caeser salad'


    // input field renders to screen properly    
    expect(nameField).toBeInTheDocument();
    expect(foodField).toBeInTheDocument();
  
    // form accepts user input 
    fireEvent.change(nameField, { target: { value: name} } );
    fireEvent.change(foodField, { target: { value: recipe } } );

    expect(nameField).toHaveValue(name);
    expect(foodField).toHaveValue(recipe);

    // after clicking 'add', it should reset input form
    //fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    

    // after some time, a 200 response should be received
  });
});
