// routes/personRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} = require('../controllers/personController');

// GET all people
router.get('/', getAllPeople);

// GET one person
router.get('/:id', getPerson);

// POST create a person
router.post('/', createPerson);

// PUT update a person
router.put('/:id', updatePerson);

// DELETE a person
router.delete('/:id', deletePerson);

module.exports = router;