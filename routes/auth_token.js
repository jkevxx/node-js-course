import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import authByEmailPwd from '../helpers/auth-by-email-pwd.js';
import { USERS_BBDD } from '../bbdd.js';

const authTokenRouter = Router();

authTokenRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailPwd(email, password);

    // Token
    const jwtConstructor = new SignJWT({ guid });

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1hr')
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (error) {
    return res.sendStatus(401);
  }
});

authTokenRouter.get('/profile', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    // console.log(payload);
    const user = USERS_BBDD.find((user) => user.guid === payload.guid);
    if (!user) return res.sendStatus(401);

    delete user.password;

    return res.send(user);
  } catch (error) {
    return res.status(401);
  }
});

export default authTokenRouter;
