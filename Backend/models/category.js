const mongoose = require('mongoose');

const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
        unique: true
    }
},
    { timestamps: true });

module.exports = mongoose.model("Category", categoryShema)  