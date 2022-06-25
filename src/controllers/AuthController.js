import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import authService from '../services/AuthService';

export default {
    async signUp(req, res) {
        try {
            const result = await authService.signUp(req.body);
            if (result.data){
                return sendSuccessResponse(res,result.code,result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async login(req, res) {
      try {
          const result = await authService.login(req.body);
          if (result.data){
            return sendSuccessResponse(res,result.code,result.data,result.msg);
        }
        return sendErrorResponse(res,result.code,result.msg,result.e);
      } catch (e) {
          console.error(e);
          return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
      }
  }
}