import { Router } from 'express';
import authByEmailPwd from '../helpers/auth-by-email-pwd.js';
import { nanoid } from 'nanoid';
import { USERS_BBDD } from '../bbdd.js';

const sessions = [];
const authSessionRouter = Router();

authSessionRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailPwd(email, password);

    const sessionId = nanoid();
    sessions.push({ sessionId, guid });

    res.cookie('sessionId', sessionId, { httpOnly: true });

    return res.send();
  } catch (error) {
    return res.sendStatus(401);
  }
});

authSessionRouter.get('/profile', (req, res) => {
  console.log(req.cookies);
  const { cookies } = req;

  if (!cookies.sessionId) return res.sendStatus(401);
  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId
  );

  if (!userSession) return res.sendStatus(401);

  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);

  if (!user) return res.sendStatus(401);

  delete user.password;

  return res.send(user);
});

export default authSessionRouter;
