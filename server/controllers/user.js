import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import createError from '../utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function updateProfileImage(req, res, next) {
  try {
    const userId = req.params.id;
    const imgPath = req.file.path.replace(/\\/g, '/');

    if (!userId) {
      return next(createError(400, 'User ID is required'));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    if (user.img) {
      const oldImage = path.join(__dirname, '../', user.img);

      if (fs.existsSync(oldImage)) {
        try {
          fs.unlinkSync(oldImage);
        } catch {
          return next(createError(500, '이미지 삭제 오류'));
        }
      }
    }

    user.img = `/uploads/${req.file.filename}`;
    await user.save();
    res.status(200).json({
      message: 'Profile image updated',
      user: { img: `uploads/${req.file.filename}` },
    });
  } catch (e) {
    next(e);
  }
}

export async function updateUser(req, res, next) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted.');
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function getAllUser(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function userBookmark(req, res, next) {
  try {
    const { bookId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.bookmark.indexOf(bookId);
    if (index === -1) {
      user.bookmark.push(bookId);
    } else {
      user.bookmark.splice(index, 1);
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
