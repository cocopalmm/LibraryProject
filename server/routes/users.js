import express from 'express';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  updateProfileImage,
  userBookmark,
} from '../controllers/user.js';
import upload from './../utils/upload.js';
const router = express.Router();

//IMAGE-UPDATE
router.put(
  '/:id/profile-image',
  verifyUser,
  upload.single('file'),
  updateProfileImage
);

//UPDATE
router.put('/:id', verifyUser, updateUser);
//DELETE
router.delete('/:id', verifyUser, deleteUser);
//GET
router.get('/:id', verifyUser, getUser);
//GET ALL
router.get('/', verifyAdmin, getAllUser);

router.put('/:id/bookmark', verifyUser, userBookmark);

export default router;
