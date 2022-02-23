const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: {type: String, required: true},
    query: {type: String, required: true},
    data: {type: String, required: true},
    favorite: {type: Boolean, required: false} // <- favorite property added
  });

  module.exports = mongoose.model('recipe', recipeSchema);
