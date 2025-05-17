const express = require('express');
const router = express.Router();
const {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} = require('../controllers/personController');

/**
 * @swagger
 * tags:
 *   name: People
 *   description: The people managing API
 */

/**
 * @swagger
 * /api/people:
 *   get:
 *     summary: Returns the list of all the people
 *     tags: [People]
 *     responses:
 *       200:
 *         description: The list of the people
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */
router.get('/', getAllPeople);

/**
 * @swagger
 * /api/people/{id}:
 *   get:
 *     summary: Get the person by id
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     responses:
 *       200:
 *         description: The person description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: The person was not found
 */
router.get('/:id', getPerson);

/**
 * @swagger
 * /api/people:
 *   post:
 *     summary: Create a new person
 *     tags: [People]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: The person was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Bad request - missing required fields or invalid data
 */
router.post('/', createPerson);

/**
 * @swagger
 * /api/people/{id}:
 *   put:
 *     summary: Update the person by the id
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: The person was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: The person was not found
 *       400:
 *         description: Bad request - invalid data
 */
router.put('/:id', updatePerson);

/**
 * @swagger
 * /api/people/{id}:
 *   delete:
 *     summary: Remove the person by id
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     responses:
 *       200:
 *         description: The person was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Person deleted successfully
 *                 deletedPerson:
 *                   $ref: '#/components/schemas/Person'
 *       404:
 *         description: The person was not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deletePerson);

module.exports = router;