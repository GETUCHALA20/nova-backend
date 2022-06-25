import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import roleService from '../services/RoleService';

export default {
    async createRole(req,res){
        if (!req.body.name){
            return sendErrorResponse(res, 400, 'Please pass role name!');
        }
        try {
            const roleInfo = req.body;
            const result = await roleService.createRole(roleInfo);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getAllRoles(req,res){
        try{
            const result = await roleService.getAllRoles();
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getRoleById(req,res){
        try {
            if (!req.params.id){
                return sendErrorResponse(res, 400, 'Please pass role id!');
            }
            const role_id = req.params.id;
            const result = await roleService.getRoleById(role_id);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async updateRoleInfo(req,res){
        try {
            if (!req.params.id || !req.body){
                return sendErrorResponse(res, 400, 'Please pass correct info!');
            }
            const role_id = req.params.id;
            const roleInfo = req.body;
            const result = roleService.updateRoleInfo(role_id,roleInfo);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 
    },

    async deleteRoleById(req,res){
        try {
            if (!req.params.id){
                return sendErrorResponse(res, 400, 'Please pass role id!');
            }
            const role_id = req.params.id;
            const result = await roleService.deleteRoleById(role_id);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 
    },

    async assignPermissionToRole(req,res){
        if (!req.body.permissions){
            return sendErrorResponse(res, 400, 'Please pass permissions!');
        }

        if (!req.params.id){
            return sendErrorResponse(res, 400, 'Please pass role id!');
        }
        const roleId = req.params.id;
        const permissions = req.body.permissions;
        const result = await roleService.assignPermissionToRole(roleId,permissions);
        if (result.data){
            return sendSuccessResponse(res,result.code,result.data,result.msg);
        }
        return sendErrorResponse(res,result.code,result.msg,result.e);
    }
}