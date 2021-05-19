const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

// Image Schema
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: [ImageSchema],
    description: {
        type: String,
        required: true
    },
    prepTime: {
        type: Number,
        required: false
    },
    cookTime: {
        type: Number,
        required: false
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

RecipeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
    
module.exports = mongoose.model('Recipe', RecipeSchema);