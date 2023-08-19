const mongoose = require("mongoose");

const dateFormat = require("../helpers/date-format.helper");

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
      required: true,
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
    createdAt: dateFormat(this.createdAt),
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
    createdAt: dateFormat(this.createdAt),
    updatedAt: dateFormat(this.updatedAt),
    createdBy: this.userID.email,
  };
};

module.exports = mongoose.model("Recipe", recipeSchema);
