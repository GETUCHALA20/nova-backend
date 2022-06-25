import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import permissionService from '../services/PermissionService';

export default {
    async createPermission(req,res){
        if (!req.body.name){
            return sendErrorResponse(res, 400, 'Please pass permission name!');
        }
        try {
            const permissionInfo = req.body;
            const result = await permissionService.createPermission(permissionInfo);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getAllPermissions(req,res){
        try{
            const result = permissionService.getAllPermissions();
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getPermissionById(req,res){
        try {
            if (!req.params.id){
                return sendErrorResponse(res, 400, 'Please pass permission id!');
            }
            const permission_id = req.params.id;
            const result = await permissionService.getPermissionById(permission_id);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async updatePermissionInfo(req,res){
        try {
            if (!req.params.id || !req.body){
                return sendErrorResponse(res, 400, 'Please pass permission information!');
            }
            const permission_id = req.params.id;
            const permissionInfo = req.body;

            const result = await permissionService.updatePermissionInfo(permission_id,permissionInfo);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);

        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 
    },

    async deletePermissionById(req,res){
        try {
            if (!req.params.id){
                return sendErrorResponse(res, 400, 'Please pass permission id!');
            }
            const permission_id = req.params.id;
            const result = await permissionService.deletePermissionsById(permission_id);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

}