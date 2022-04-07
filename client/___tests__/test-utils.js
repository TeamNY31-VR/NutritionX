import React from 'react';
import { render as rtlRender} from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import recipeReducer from '../store/recipes-slice';
import { initialRecipesState } from '../store/recipes-slice';

const render = (
  ui, {
    initialState = initialRecipesState,
    store = createStore(recipeReducer, initialState), 
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions});
};

export * from '@testing-library/react';
export { render }
