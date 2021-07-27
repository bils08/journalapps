const router = require('express').Router();
let Journal = require('../models/journal.model');

router.route('/').get((req,res) => {
    Journal.find()
        .then(journals => res.json(journals))
        .then(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const content = req.body.content;
    const date = Date.parse(req.body.date);
    
    const newJournal = new Journal({
        username,
        content,
        date,
    });

    newJournal.save()
        .then(() => res.json('Today Journal added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
   Journal.findById(req.params.id)
      .then(journal => res.json(journal))
      .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/:id').delete((req,res) => {
    Journal.findByIdAndDelete(req.params.id)
       .then(() => res.json('Journal Deleted'))
       .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/update/:id').post((req,res) => {
    Journal.findById(req.params.id)
       .then(journal => {
           journal.username =  req.body.username;
           journal.content = req.body.content;
           journal.date = Date.parse(req.body.date);
       })
       .catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router;