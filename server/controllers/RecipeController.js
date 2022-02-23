const Recipe = require('../models/RecipeModel.js');
const axios = require('axios');

require('dotenv').config();

const recipeController = {};

recipeController.createRecipe = async (req, res, next) => {
    const { name, query } = req.body;
    try {
        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
            {query: `${query}`},
            {headers: {"Content-Type": "application/json", 
            "x-app-id": process.env.X_APP_ID,
            "x-app-key": process.env.X_APP_KEY}});
        const newRecipe = await Recipe.create({
                name: name,
                query: query,
                data: JSON.stringify(response.data.foods),
                favorite: false, // <- added favorite property
            })
        console.log('Created new recipe in database successfully')
        res.locals.newRecipe = newRecipe;
        // console.log(newRecipe.favorite);
        return next();
    } catch (err) {
        console.log(err)
        return next({
            log: `recipeController.createRecipe: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: { err: 'Error occurred in recipeController.createRecipe. Check server logs for more details.' },
          })
    }
}

recipeController.getRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find({});
        res.locals.recipes = recipes;
        return next();
    } catch (err) {
        console.log(err)
        return next({
            log: `recipeController.getRecipes: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: { err: 'Error occurred in recipeController.getRecipes. Check server logs for more details.' },
          })
    }
}

recipeController.editRecipe = async (req, res, next) => {
    const { query, name, id, favorite = true } = req.body; // <- added favorite and set to true as a test
    console.log(req.body, 'inside controller');

    const dbUpdateObj = {};
    try {
            const dbResponse = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
                {query: `${query}`},
                {headers: {"Content-Type": "application/json", 
                 "x-app-id": process.env.X_APP_ID,
                 "x-app-key": process.env.X_APP_KEY}});
            dbUpdateObj.query = query;
            dbUpdateObj.data = JSON.stringify(dbResponse.data.foods);
            dbUpdateObj.name = name;
            dbUpdateObj.favorite = favorite; // <- added favorite
            const updatedRecipe = await Recipe.findOneAndUpdate({
            _id: id,
            }, dbUpdateObj, {new: true});
            res.locals.updatedRecipe = updatedRecipe;
            // console.log(updatedRecipe.favorite) // <- test for favorite in editRecipe controller
            return next();
    } catch (err) {
        console.log(err)
        return next({
            log: `recipeController.editRecipe: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: { err: 'Error occurred in recipeController.editRecipe. Check server logs for more details.' },
          })
    }
}

recipeController.deleteRecipe = async (req, res, next) => {
    try {
        const deletedRecipe = await Recipe.findOneAndDelete({
            _id: req.params.id,
        });
        return next();
    } catch (err) {
        console.log(err)
        return next({
            log: `recipeController.deleteRecipe: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: { err: 'Error occurred in recipeController.deleteRecipes. Check server logs for more details.' },
          })
    }
}

module.exports = recipeController;





