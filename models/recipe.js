const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    recipe: {
      ingredients: [
        {
          name: {
            type: String,
            required: true,
          },
          amount: {
            type: String,
            required: true,
          },
        },
      ],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

recipeSchema.methods.toJSON = function () {
  return {
    id: this.id,
    title: this.title,
  };
};

recipeSchema.methods.toJSONForDetail = function () {
  return {
    id: this.id,
    title: this.title,
    recipe: this.recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
    })),
  };
};

module.exports = mongoose.model("Recipe", recipeSchema);
