const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text:String,
    timestamp:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);