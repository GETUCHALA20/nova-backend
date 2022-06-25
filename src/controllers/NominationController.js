import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import nominationService from '../services/NominationService';

export default {
    async nominateMember(req, res) {
        try {
            const id = req.userData.id;
            const nominationInfo = req.body;

            const result = await nominationService.nominateMember(nominationInfo,id);

            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getAllNominations(req,res){
        try{
            const result = await nominationService.getAllNominations();
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getAllNominationsByUser(req,res){
        try {
            const currentUser = req.userData;
            const paramId = req.params.id;
            const result = await nominationService.getAllNominationsByUser(currentUser.id,paramId);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getNominationById(req,res){
        try {

            const nomination_id = req.params.id;
            const result = await nominationService.getNominationById(nomination_id);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 
    },

    async updateNominationInfo(req,res){
        try {
            const nomination_id = req.params.id;
            const nominationInfo = req.body;

            const result = await nominationService.updateNominationInfo(nomination_id,nominationInfo);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);

        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 
    },

    async deleteNominationById(req,res){
        try {
            const nomination_id = req.params.id;
            const result = await nominationService.deleteNominationById(nomination_id);

            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 

    }

}