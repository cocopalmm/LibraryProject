import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import {
  createBook,
  getBook,
  getAllBook,
  updateBook,
  deleteBook,
  countByAuthor,
  countByGenre,
} from './../controllers/book.js';

const router = express.Router();

router.post('/', verifyAdmin, createBook);

router.put('/:id', verifyAdmin, updateBook);

router.delete('/:id', verifyAdmin, deleteBook);

router.get('/find/:id', getBook);

router.get('/', getAllBook);

router.get('/countByAuthor', countByAuthor);

router.get('/countByGenre', countByGenre);

export default router;
