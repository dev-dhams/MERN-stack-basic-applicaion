const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    quantity : {
        type: Number,
        default : 0
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = Product = mongoose.model("Product", ProductSchema);
