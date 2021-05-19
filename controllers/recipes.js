const Recipe = require('../models/recipes');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {recipes});
};

module.exports.renderNewForm = async (req, res) => {
    res.render('recipes/new');
};

module.exports.createRecipe = async (req, res) => {
    const recipe = new Recipe(req.body.recipe);
    recipe.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    recipe.author = req.user._id;
    await recipe.save();
    req.flash('success', 'New recipe was successfully added!');
    res.redirect(`/recipes/${recipe._id}`);
};

module.exports.showRecipe = async (req, res,) => {
    const recipe = await Recipe.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!recipe) {
        req.flash('error', 'Recipe not found!');
        return res.redirect('/recipes');
    }
    res.render('recipes/show', { recipe });
};

module.exports.renderEditForm = async(req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if(!recipe) {
        req.flash('error', 'Recipe not found!');
        return res.redirect('/recipes');
    }
    res.render('recipes/edit', { recipe });
};

module.exports.updateRecipe = async(req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe});
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    recipe.images.push(...imgs);
    await recipe.save()
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await recipe.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Recipe was successfully updated!');
    res.redirect('/recipes');
};

module.exports.deleteRecipe = async(req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    req.flash('success', 'Recipe was successfully deleted!');
    res.redirect('/recipes');
};