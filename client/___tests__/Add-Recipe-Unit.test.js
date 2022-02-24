import React from 'react';
import AddRecipe from '../Components/AddRecipe';
import { render, screen } from './test-utils';

describe('<AddRecipe /> component', () => {
  let addRecipeComponent;

  beforeEach(() => {addRecipeComponent = render(<AddRecipe />)});
 
  it('addRecipeComponent renders correctly',() => {
    expect(addRecipeComponent).toMatchSnapshot();
  });

  it('renders 3 buttons to page', () => {
    expect(screen.getAllByRole('button')).toHaveLength(3);
  })

  it('renders a heading to the page', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
  })
  
  it('renders form input field name to the page', () => {
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  })
});