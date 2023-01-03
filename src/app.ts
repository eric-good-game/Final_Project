import 'dotenv/config';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import rootRouter from './routes';
const app = express();

import './configs/mongodb.config';
import './configs/passport.config';

const options: CorsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  // optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', rootRouter);

export default app;
