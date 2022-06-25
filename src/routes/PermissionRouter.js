import express from 'express';
import Auth from '../middlewares/Auth';
import can from '../middlewares/canAccess';
import Constants from '../utils/constants';
import PermissionController from '../controllers/PermissionController';

const router = express.Router();

router.post('/permissions',Auth, can(Constants.PERMISSION_VIEW_ALL_USERS),  PermissionController.createPermission);

router.get('/permissions',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS),PermissionController.getAllPermissions);

router.get('/permissions/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS),PermissionController.getPermissionById);

router.put('/permissions/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS), PermissionController.updatePermissionInfo);

router.delete('/permissions/:id',Auth,can(Constants.PERMISSION_VIEW_ALL_USERS), PermissionController.deletePermissionById);

export default router;