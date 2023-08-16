const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const bookValidation = require('../../validations/book.validation');
const bookController = require('../../controllers/book.controller');

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post('/', validate(bookValidation.register), auth(), bookController.createBook);
router.patch('/:id', auth(), bookController.updateBook);
router.delete('/:id', auth(), validate(bookValidation.deleteBook), bookController.deleteBook);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management and retrieval
 */

/**
 * @swagger
 * path:
 *  /api/books:
 *    post:
 *      summary: Create a book
 *      description: Only admins can create other books.
 *      tags: [Books]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *                - pages
 *                - role
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  pages:
 *                      type:integer
 *                  isbn:
 *                      type:string
 *                  genre:
 *                      type: string
 *                  author_id:
 *                      type:integer
 *
 *              example:
 *
 *                title: The Spy Who Loved Me
 *                description: A gripping thriller published by John Graham
 *                pages: 45678
 *                isbn: "9783161484100"
 *                genre: drama
 *                author_id: 1
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Book'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all books
 *      description: Only admins can retrieve all books.
 *      tags: [Books]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Book name
 *        - in: query
 *          name: role
 *          schema:
 *            type: string
 *          description: Book role
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
 *          description: Maximum number of books
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
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Book'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /api/books/{id}:
 *    get:
 *      summary: Get a book
 *      description: Logged in books can fetch only their own book information. Only admins can fetch other books.
 *      tags: [Books]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Book id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Book'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a book
 *      description: Logged in books can only update their own information. Only admins can update other books.
 *      tags: [Books]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Book id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  pages:
 *                      type:integer
 *                  isbn:
 *                      type:string
 *                  genre:
 *                      type: string
 *                  author_id:
 *                      type:integer
 *
 *              example:
 *
 *                title: The Spy Who Loved Me
 *                description: A gripping thriller published by John Graham
 *                pages: 45678
 *                isbn: "9783161484100"
 *                genre: drama
 *                author_id: 1
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Book'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a book
 *      description: Logged in books can delete only themselves. Only admins can delete other books.
 *      tags: [Books]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Book id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
