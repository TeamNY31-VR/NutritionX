import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  FormHelperText,
  FormLabel,
  Typography,
  Button,
  Card,
  Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recipeActions } from '../store/recipes-slice';
import { addRecipe, syncRecipes, showFavoriteRecipes } from '../store/recipes-slice';

const AddRecipe = () => {
  const dispatch = useDispatch();
  const newRecipeName = useSelector((state) => state.recipes.newRecipeName);
  const newIngredientsList = useSelector(
    (state) => state.recipes.newIngredientsList
  );

  const recipeNameHandler = (value) => {
    dispatch(recipeActions.setRecipeName(value));
  };
  const ingredientsListHandler = (value) => {
    dispatch(recipeActions.setIngredientList(value));
  };

  const body = {
    name: newRecipeName,
    query: newIngredientsList,
  };

  const clearFields = () => {
    dispatch(recipeActions.setRecipeName(''));
    dispatch(recipeActions.setIngredientList(''));
  };

  return (
    <Card id="AddRecipe" variant="outlined" sx={{ p: 2 }}>
      <FormControl sx={{ width: '100%' }}>
        <Box container sx={{ display: 'flex' }}>
          <Typography variant="h4" aria-level="4">
            Add Your Meal
          </Typography>
          <TextField
            required
            label="Name"
            // id="fullWidth"
            sx={{ mx: 2 }}
            value={newRecipeName}
            onChange={(e) => recipeNameHandler(e.target.value)}
          />
          <Box sx={{ mr: 2, flexGrow: 1 }}>
            <TextField
              // fullWidth
              required
              label="Ingredients"
              // id="fullWidth"
              sx={{ width: '100%' }}
              // flex={1}
              // multiline={true}
              // rows={11}
              value={newIngredientsList}
              onChange={(e) => ingredientsListHandler(e.target.value)}
            />
          </Box>
          <Button
          id="add-btn"
            type="submit"
            variant="outlined"
            onClick={() =>
              dispatch(addRecipe(body))
                .then(() => dispatch(recipeActions.setRecipeName('')))
                .then(() => dispatch(recipeActions.setIngredientList('')))
                .then(() => dispatch(syncRecipes()))
            }
          >
            Add
          </Button>
          <Button
          id="show-faves-btn"
            type="submit"
            variant="outlined"
            onClick={() =>
              dispatch(addRecipe(body)).then(() =>
                dispatch(showFavoriteRecipes())
              )
            }
          >
            Show Favorites
          </Button>
          <Button
            id="show-all-btn"
            type="submit"
            variant="outlined"
            onClick={() =>
              dispatch(addRecipe(body)).then(() => dispatch(syncRecipes()))
            }
          >
            Show All
          </Button>
        </Box>
      </FormControl>
    </Card>
  );
};

export default AddRecipe;
