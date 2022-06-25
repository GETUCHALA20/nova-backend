import {Op} from 'sequelize';
import model from '../models';
import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import userService from '../services/UserService';
const {User} = model;

export default {
    async createUser(req,res){
        try {
            const result = await userService.createUser(req.body);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getAllUsers(req,res){
        try {
            const result = await userService.getAllUsers();
            if (result.data){
                return sendSuccessResponse(res, result.code, result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async getUserById(req,res){
        try {
            if (!req.params.id){
                return sendErrorResponse(res, 400, 'Please pass user id!');
            }
            const user_id = req.params.id;
            const result = await userService.getUserById(user_id);
            if (result.data){
                return sendSuccessResponse(res, result.code, result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async updateUserInfo(req,res){
        try {
            const user_id = req.params.id;
            const userInfo = req.body;
            if (!user_id || !userInfo){
                return sendErrorResponse(res, 400, 'Please pass user id or user information to update');
            }
            const result = await userService.updateUserInfo(user_id,userInfo);

            if (result.data){
                return sendSuccessResponse(res, result.code, result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);

        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 
    },

    async deleteUserById(req,res){
        try {
            const user_id = req.params.id;
            if (!user_id){
                return sendErrorResponse(res, 400, 'Please pass user id!');
            }
            
            const result = await userService.deleteUserById(user_id);
            if (result.data){
                return sendSuccessResponse(res, result.code, result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);

        } catch(e){
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        } 
    }
}