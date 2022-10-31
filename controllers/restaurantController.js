const {Restaurant} = require('../models');
const categories = ['Italian', 'Fast Food'];
module.exports.viewAll = async function(req, res, next) {
    const restaurants = await Restaurant.findAll();
    res.render('index', {restaurants});
}

module.exports.renderEditForm = async function(req, res, next) {
    const restaurant = await Restaurant.findByPk(
        req.params.id
    );
    res.render('edit', {restaurant, categories});
}


module.exports.updateRestaurant = async function(req, res) {
    await Restaurant.update(
        {
            name: req.body.name,
            category: req.body.category,
            rating: req.body.rating,
            image: req.body.image,
            description: req.body.description
        },
        {
            where:
                {
                    id: req.params.id
                }
        });
    res.redirect('/');
}

module.exports.deleteRestaurant = async function(req, res) {
    await Restaurant.destroy(
        {
            where:
                {
                    id: req.params.id
                }
        });
    res.redirect('/');
}

module.exports.renderAddForm = function(req, res) {
    const restaurant = {
        name: "",
        description: "",
        rating: 1,
        image: "",
        category: categories[0],
    };
    res.render('add', {restaurant, categories});
}

module.exports.addRestaurant = async function(req, res) {
    await Restaurant.create(
        {
            name: req.body.name,
            category: req.body.category,
            rating: req.body.rating,
            image: req.body.image,
            description: req.body.description
        });
    res.redirect('/');
}

// const restaurants = [{
//     id: 1,
//     name: 'Pizza Factory',
//     image: 'https://images.squarespace-cdn.com/content/v1/57d6c04459cc6892167788b2/1473756645695-5W7MIKWNW48FQ3RWOXF0/Depositphotos_25037853_original.jpg?format=2500w',
//     rating: 3,
//     category: 'Italian',
//     description: 'Our hand-tossed pizzas are simply the best. Each bubbly, cheesy pie is made with the 100% real mozzarella cheese and our signature sauce. It’s hard to say what makes it so delicious: the dough, the sauce, or is it the fresh toppings? We’ll let you decide, if you can.',
// },
//     {
//      id: 2,
//      name: 'Domino\'s',
//      image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-09/Dominos-20-percent-off-menu-mc-220906-b38127.jpg',
//      rating: 2,
//      category: 'Italian',
//      description: 'From humble beginnings as a single pizza restaurant in 1960, Domino’s has become today’s recognized world leader in pizza delivery. At Domino’s we’re all about pizza — and from the day our doors opened, we have dedicated ourselves to making and delivering delicious food with high-quality ingredients. Beyond pioneering the concept of efficiently delivering our made-to-order pizzas, we have been a part of innovations that have made a significant impact on the entire food delivery industry. We’re all about delivery ideas that make it easier and more convenient for our customers. When you think about pizza places that have delivered hot and fresh from the oven to your door, think Domino’s, because we’re constantly updating our menu to include more entrees, sides, and desserts created just for you.',
//     }];