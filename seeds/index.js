const mongoose = require('mongoose');
const Recipe = require('../models/recipes');

mongoose.connect('mongodb://localhost:27017/spice-book', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Recipe.deleteMany({});
    const recipe = new Recipe({
        name: "Pizza",
        prepTime: 30,
        cookTime: 20,
        ingredients: [
            {
                ingredient: "Cheese",
                amount: 20,
                unit: "oz"
            },
            {
                ingredient: "Sauce",
                amount: 8,
                unit: "oz"
            },
            {
                ingredient: "Crust",
                amount: 1,
                unit: ""
            }
        ]
    })
    await recipe.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})