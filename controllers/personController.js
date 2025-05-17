
const Person = require('../models/Person');

// Get all people
const getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ 
      message: err.message,
      exampleResponse: {
        message: "Error fetching people",
        error: "Database connection failed"
      }
    });
  }
};

// Get one person
const getPerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Cannot find person' });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a person
const createPerson = async (req, res) => {
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
};

// Update a person
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Cannot find person' });
    }

    if (req.body.firstName != null) person.firstName = req.body.firstName;
    if (req.body.lastName != null) person.lastName = req.body.lastName;
    if (req.body.email != null) person.email = req.body.email;
    if (req.body.favoriteColor != null) person.favoriteColor = req.body.favoriteColor;
    if (req.body.birthday != null) person.birthday = req.body.birthday;

    const updatedPerson = await person.save();
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a person
const deletePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Cannot find person' });
    }

    await person.deleteOne();
    res.json({ 
      message: 'Person deleted successfully',
      deletedPerson: person
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to delete person',
      error: err.message 
    });
  }
};

module.exports = {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
};