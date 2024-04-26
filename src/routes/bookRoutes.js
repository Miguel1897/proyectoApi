import express from 'express';
import { bookController } from '../controllers/bookController.js';

const router = express.Router();

router.get("/all", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post("/:id", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;
