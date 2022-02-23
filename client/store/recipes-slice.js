import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

const initialRecipesState = {
	recipes: [],
	newRecipeName: '',
	newIngredientsList: '',
	gotRecipes: false,
};

export const syncRecipes = createAsyncThunk(
	'recipes/syncRecipesStatus',
	async () => {
		try {
			console.log('in the syncRecipes Thunk function');
			const response = await axios.get('/recipes');
			// console.log('Here is your data: ', response);
			return response.data.reverse();
		} catch (e) {
			console.log(e);
		}
	}
);

export const showFavoriteRecipies = createAsyncThunk(
	'recipes/showFavoriteRecipesStatus',
	async () => {
		try {
			console.log('in the showFavoriteRecipies Thunk function');
			const response = await axios.get('/recipes/favorites');
			// console.log('Here is your data: ', response);
			return response.data.reverse();
		} catch (e) {
			console.log(e);
		}
	}
);

export const editRecipe = createAsyncThunk(
	'/recipes/editRecipeStatus',
	async (editBody) => {
		try {
			console.log('editBody',editBody);
				console.log("in the editRecipes Thunk function");
			const editRecipe = fetch('/recipes', {
        method: "PUT",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(editBody),
      });
						console.log("out of the editRecipes Thunk function", editRecipe);
			return editRecipe.status;
		} catch (e) {
			console.log(e);
		}
	}
);

export const deleteRecipe = createAsyncThunk(
	'/recipes/deleteRecipeStatus',
	async (id) => {
		try {
			const deletedRecipe = fetch(`/recipes/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'Application/JSON',
				},
			});
			return deletedRecipe.status;
		} catch (e) {
			console.log(e);
		}
	}
);

export const addRecipe = createAsyncThunk(
	'/recipes/addRecipeStatus',
	async (body) => {
		try {
			const addedRecipe = fetch('/recipes', {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/JSON',
				},
				body: JSON.stringify(body),
			});
			return addedRecipe;
		} catch (e) {
			console.log(e);
		}
	}
);

const recipeReducer = createSlice({
	name: 'recipes',
	initialState: initialRecipesState,
	reducers: {
		// setRecipe(state, action) {
		//   state.recipes.push(action.payload)
		// },
		setRecipes(state, action) {
			console.log(action.payload);
			state.recipes = action.payload;
		},
		setRecipeName(state, action) {
			console.log('in setRecipeName');
			state.newRecipeName = action.payload;
		},
		setIngredientList(state, action) {
			console.log('in setIngredientList');
			state.newIngredientsList = action.payload;
		},
		setGotRecipes(state) {
			state.gotRecipes = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(syncRecipes.fulfilled, (state, action) => {
			console.log('In builder ');
			// console.log(action.payload.data);
			state.recipes = action.payload;
		});
	},
});

export const recipeActions = recipeReducer.actions;

export default recipeReducer.reducer;
