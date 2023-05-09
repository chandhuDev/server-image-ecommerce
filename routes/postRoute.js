/**
 * @swagger
 * components:
 *   schemas:
 *     Images:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         comment:
 *           type: string
 *           description: The comment text of the book
 *          userId:
 *           type: string
 *           description: The user id which was created first 
 *         imageUrl:
 *           type: string
 *           description: The imageUrl of your Image , it should be url
 *         description:
 *           type: string
 *           description: The image description
 *         like:
 *           type: string
 *           description: person id who liked the image
 *     
 */
/**
 * @swagger
 * tags:
 *   name: Images
 *   description: The image ecommerce API
 * /getAllPosts:
 *   get:
 *     summary: Lists all the books
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: The list of the images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Images'
 * /update:
 *   put:
 *     summary: Update the Image by the id of Image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Images'
 *     responses:
 *       200:
 *         description: The Image was updated
 *         content:
 *           application/json:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Images'
 *       404:
 *         description: The Image was not found
 *       500:
 *         description: Some error happened
 * /create:
 *   post:
 *     summary: Create a new Image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Images'
 *     responses:
 *       200:
 *         description: Created Image response 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Images'
 *       500:
 *         description: Some server error
 * /delete:
 *   delete:
 *     summary: Remove the Image by id
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Images'
 *
 *     responses:
 *       200:
 *         description: The Image was deleted
 *       404:
 *         description: The Image was not found
 */
const express=require("express")
const router=express.Router()
const {createPost,updatePost,deletePost,allPosts}=require("../controllers/postController")

router.route("/create").post(createPost)
router.route("/update").put(updatePost)
router.route("/delete").delete(deletePost)
router.route("/getAllPosts").get(allPosts)

module.exports=router