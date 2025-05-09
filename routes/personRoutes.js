const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one person
router.get('/:id', getPerson, (req, res) => {
  res.json(res.person);
});

// POST create a person
router.post('/', async (req, res) => {
  const person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a person
router.put('/:id', getPerson, async (req, res) => {
  if (req.body.firstName != null) {
    res.person.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.person.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.person.email = req.body.email;
  }
  if (req.body.favoriteColor != null) {
    res.person.favoriteColor = req.body.favoriteColor;
  }
  if (req.body.birthday != null) {
    res.person.birthday = req.body.birthday;
  }

  try {
    const updatedPerson = await res.person.save();
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a person

router.delete('/:id', getPerson, async (req, res) => {
    try {
      await Person.deleteOne({ _id: res.person._id });
      res.json({ message: 'Deleted Person' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Middleware to get a person by ID
async function getPerson(req, res, next) {
  let person;
  try {
    person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: 'Cannot find person' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.person = person;
  next();
}

module.exports = router;