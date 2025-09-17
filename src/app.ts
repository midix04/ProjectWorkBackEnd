import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './api/routes';
import { errorHandlers } from './errors';
import './lib/auth/local/local-strategy'

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(errorHandlers);

export default app;