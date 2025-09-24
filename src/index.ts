import 'reflect-metadata';
import { createServer } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('debug', true);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ProjectWork";

mongoose.connect(MONGO_URI)
  .then(() => {
    createServer(app).listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
