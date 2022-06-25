import express from 'express';
import Auth from '../middlewares/Auth';
import can from '../middlewares/canAccess';
import Constants from '../utils/constants';
import NominationController from '../controllers/NominationController';

const router = express.Router();

router.post('/nominations',Auth, NominationController.nominateMember);

router.get('/nominations',Auth,can(Constants.PERMISSION_VIEW_ALL_NOMINATIONS),NominationController.getAllNominations);

router.get('/nominations/per-user/:id',Auth,NominationController.getAllNominationsByUser);

router.get('/nominations/:id',Auth,NominationController.getNominationById);

router.put('/nominations/:id',Auth,NominationController.updateNominationInfo);

router.delete('/nominations/:id',Auth,NominationController.deleteNominationById);

export default router;