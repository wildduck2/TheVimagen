import { RequestHandler } from 'express';
import { generateToken } from '../../utils';

export const csrfToken: RequestHandler = (req, res) => {
  const csrfToken = generateToken(req, res);
  res.json({ csrfToken });
};
