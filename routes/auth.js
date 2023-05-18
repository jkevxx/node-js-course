import { Router } from 'express';
import { USERS_BBDD } from '../bbdd.js';

const authRouter = Router();

// Public endpoint
authRouter.get('/public', (req, res) => res.sendStatus('Public Endpoint'));

// Authenticated endpoint

authRouter.post('/authenticated', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  const user = USERS_BBDD.find((user) => user.email === email);
  if (!user) return res.sendStatus(401);

  // console.log(password);

  if (user.password !== password) return res.sendStatus(401);

  res.send(`User ${user.name} authenticated`);
});

// Authorized endpoint

authRouter.post('/authorized', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  const user = USERS_BBDD.find((user) => user.email === email);
  if (!user) return res.sendStatus(401);

  if (user.password !== password) return res.sendStatus(401);
  if (user.role !== 'admin') return res.sendStatus(403);

  res.send(`Admin User ${user.name}`);
});

export default authRouter;
