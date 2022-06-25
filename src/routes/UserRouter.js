import express from 'express';
import Auth from '../middlewares/Auth';
import can from '../middlewares/canAccess';
import Constants from '../utils/constants';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/users',Auth, can(Constants.PERMISSION_VIEW_ALL_USERS),  UserController.createUser);

router.get('/users',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS),UserController.getAllUsers);

router.get('/users/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS),UserController.getUserById);

router.put('/users/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS), UserController.updateUserInfo);

router.delete('/users/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS), UserController.deleteUserById);

export default router;