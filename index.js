import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/auth_token.js';
import authSessionRouter from './routes/auth_session.js';

dotenv.config();

const PORT = process.env.PORT;
const expressApp = express();

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use('/account', accountRouter);
expressApp.use('/auth', authRouter);

expressApp.use('/auth-session', authSessionRouter);
expressApp.use('/auth-token', authTokenRouter);

expressApp.listen(PORT, () => {
  console.log(`Server Up in port ${PORT}`);
});
