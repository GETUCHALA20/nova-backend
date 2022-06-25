import express from 'express';
import Auth from '../middlewares/Auth';
import can from '../middlewares/canAccess';
import Constants from '../utils/constants';
import RoleController from '../controllers/RoleController';

const router = express.Router();

router.post('/roles',Auth, can(Constants.PERMISSION_VIEW_ALL_USERS),  RoleController.createRole);

router.get('/roles',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS),RoleController.getAllRoles);

router.get('/roles/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS),RoleController.getRoleById);

router.put('/roles/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS), RoleController.updateRoleInfo);

router.delete('/roles/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS), RoleController.deleteRoleById);

export default router;