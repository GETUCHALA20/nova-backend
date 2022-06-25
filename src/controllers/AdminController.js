import {sendErrorResponse, sendSuccessResponse} from "../utils/sendResponse";
import adminService from "../services/AdminService";

export default {
    async users(req, res) {
        try {
            const result = await adminService.getAllUsers();
            if (result.data){
                return sendSuccessResponse(res, result.code, result.data,result.msg);
            }
            return sendErrorResponse(res,result.code,result.msg,result.e);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },
}