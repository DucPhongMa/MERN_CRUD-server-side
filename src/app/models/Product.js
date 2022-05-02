const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    Name: { type: String, required: true, unique: true },
    Description: { type: String },
    Price: {
        type: Number, required: true,
    },
    Quantity: { type: Number, required: true,},
    Image: { type: String}
},{
    timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema, 'products');