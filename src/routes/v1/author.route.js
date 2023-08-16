const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const authorValidation = require('../../validations/author.validation');
const authorController = require('../../controllers/author.controller');

const router = express.Router();

router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getAuthor);
router.post('/', validate(authorValidation.register), auth(), authorController.createAuthor);
router.put('/:id', auth(), authorController.updateAuthor);
router.delete('/:id', auth(), authorController.deleteAuthor);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management and retrieval
 */

/**
 * @swagger
 * path:
 *  /api/authors:
 *    get:
 *      summary: Get all authors
 *      description: Get a list of all authors.
 *      tags: [Authors]
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Author name
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of authors
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Author'
 *    post:
 *      summary: Create an author
 *      description: Create a new author.
 *      tags: [Authors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Author'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * path:
 *  /api/authors/{id}:
 *    get:
 *      summary: Get an author by ID
 *      description: Get detailed information about a single author by ID.
 *      tags: [Authors]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Author ID
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Author'
 *        "404":
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *    put:
 *      summary: Update an author by ID
 *      description: Update an existing author's information by ID.
 *      tags: [Authors]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Author ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Author'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "404":
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *    delete:
 *      summary: Delete an author by ID
 *      description: Delete an existing author by ID.
 *      tags: [Authors]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Author ID
 *      responses:
 *        "204":
 *          description: No Content
 *        "404":
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
