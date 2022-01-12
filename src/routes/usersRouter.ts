import express from 'express';
import { signup, login, logout } from '../controller/authController';

const router = express.Router();

/* GET users listing. */
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

export default router;
