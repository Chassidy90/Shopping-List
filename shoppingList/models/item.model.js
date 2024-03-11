const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide product name"],
        maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        // default: 0,
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
    },

    category: {
        type: String,
        default: null,
    },

    image:{
        type: String,
        default: 'https://www.ecreativeim.com/blog/wp-content/uploads/2011/05/image-not-found.jpg'
    },
});

module.exports = mongoose.model("Item", ItemSchema);
