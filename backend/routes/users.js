const router = require('express').Router(); //Express router
let User = require('../models/user.model'); // mongoose model

router.route('/').get((req, res) => { //first endpoint incoming http get requests @ /users URL
    User.find() //mongoose method, gets users list from db
    .then(users => res.json(users)) //then get users returns in JSON
    .catch(err => res.status(400).json('Error: ' + err)); //err
});

router.route('/add').post((req, res) => { //post requests @ /add
    const username = req.body.username;

    const newUser= new User({username}); //create a new user using username

    newUser.save() //save user to db
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 