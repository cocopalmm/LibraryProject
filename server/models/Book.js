import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: {
      //책 제목
      type: String,
      required: true,
    },
    sell: {
      //책 판매 수
      type: Number,
      required: true,
    },
    author: {
      //저자
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
    publishedDate: {
      //출판일
      type: Date,
      required: true,
    },
    publisher: {
      //출판사
      type: String,
      required: true,
    },
    genre: {
      //장르
      type: String,
      required: true,
    },
    summary: {
      //요약
      type: String,
      required: true,
    },
    coverImage: {
      //책 표지
      type: String,
      required: true,
    },
    load: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Book', BookSchema);
