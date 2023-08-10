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

module.exports = mongoose.model("Recipe", recipeSchema);
