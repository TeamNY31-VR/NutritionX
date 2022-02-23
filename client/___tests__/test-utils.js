import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import recipeReducer from '../store/recipes-slice';
import { initialRecipesState } from '../store/recipes-slice';

const renderConnected = (
  ui, {
    initialState = initialRecipesState,
    store = createStore(recipeReducer, initialState), 
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions});
};

export default renderConnected;
