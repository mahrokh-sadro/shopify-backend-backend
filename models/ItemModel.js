const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: String,
  category: String,
  quantity: Number,

  dateCreated: {
    type: Date,
    default: Date.now(),
  },

  sold: {
    type: Number,
    default: 0,
  },

  is_deleted: {
    type: Boolean,
    default: false,
  },
});

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;
