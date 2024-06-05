import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import bookRoute from './routes/books.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to DB');
  } catch (err) {
    console.log(err);
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('DB disconnected!');
});

const corsOptions = {
  origin: 'http://localhost:3000', // 클라이언트 url
  credentials: true, // 자격 증명 허용
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log('Connected to backend');
});
