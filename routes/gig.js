const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Gig = require('../models/Gig');

//Get all gigs
router.get('/', (req, res) => {
  Gig.findAll()
    .then((gigs) => {
      res.render('gigs', { gigs });
    })
    .catch((err) => console.log(err));
});

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, contact_email, description } = req.body;
  let errors = [];

  if (
    title === '' ||
    technologies === '' ||
    contact_email === '' ||
    description === ''
  ) {
    errors.push({ msg: 'Please fill all the fields!' });
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      contact_email,
      description,
    });
  } else {
    //if budget is left empty
    if (budget === '') {
      budget = 'unknown';
    } else {
      budget = `$${budget}`;
    }

    //converting technologies to lowercase $ removing space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    //insert data in table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email,
    })
      .then((gig) => res.redirect('/gigs'))
      .catch((err) => console.log(err));
  }
});

//Search gigs
router.get('/search', (req, res) => {
  let { search } = req.query;
  search = search.toLowerCase();
  Gig.findAll({ where: { technologies: { [Op.like]: `%${search}%` } } })
    .then((gigs) => res.render('gigs', { gigs }))
    .catch((err) => console.log(err));
});

module.exports = router;
