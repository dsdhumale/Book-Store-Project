import express from 'express';
import * as userController from '../controllers/user.controller';
import { registrationValidator } from '../validators/user.validator';
import { userPasswordAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user registration
router.post('/registration', registrationValidator, userController.newUserRegistration);

//route to login new user
router.post('/login', userController.login);

export default router;

