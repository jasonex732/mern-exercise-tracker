const router = require('express').Router(); //Express router
let Exercise = require('../models/exercise.model'); // mongoose model

router.route('/').get((req, res) => { //first endpoint incoming http get requests @ /exercise/ URL
    Exercise.find() //mongoose method, gets exercise list from db
    .then(exercises => res.json(exercises)) //then get exercises returns in JSON
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => { //post requests @ /add
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
     //create a new exercises using info

     const newExercise = new Exercise ({
         username,
         description,
         duration,
         date,
     });

    newExercise.save() //save user to db
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id:').get((req, res) => { //get info
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise)) //return json
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id:').delete((req, res) => { //delete
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/id:').post((req, res) => { //update 
    Exercise.findById(req.params.id) //find first, pass in req param
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;