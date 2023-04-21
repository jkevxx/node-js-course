import express from 'express';
import { USERS_BBDD } from '../bbdd.js';

const accountRouter = express.Router();

// Middleware
accountRouter.use((req, res, next) => {
  console.log(req.ip);
});

// GET
accountRouter.get('/', (req, res) => {
  return res.send(USERS_BBDD);
});

// GET by ID
accountRouter.get('/:guid', (req, res) => {
  const user = USERS_BBDD.find((user) => user.guid === req.params.guid);

  if (!user) return res.status(404).send();

  return res.send(user);
});

// POST
accountRouter.post('/', (req, res) => {
  const { guid, name } = req.body;

  if (!guid || !name) return res.status(400).send();

  const user = USERS_BBDD.find((user) => user.guid === guid);
  if (user) return res.status(409).send();

  USERS_BBDD.push({ guid, name });

  return res.send();
});

// PATCH
accountRouter.patch('/:guid', (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;

  const user = USERS_BBDD.find((user) => user.guid === guid);
  if (!user) return res.status(404).send();

  user.name = name;

  return res.send();
});

// DELETE
accountRouter.delete('/:guid', (req, res) => {
  const { guid } = req.params;
  const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid);

  if (userIndex === -1) return res.status(404).send();

  USERS_BBDD.splice(userIndex, 1);

  return res.send();
});

export default accountRouter;
