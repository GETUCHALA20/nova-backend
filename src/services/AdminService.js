import model from '../models';
const { User } = model;

export default {
    async getAllUsers(){
        try {
            const users = await User.findAll()
            return {code:200,data:users,msg:"All registered users"}
        }catch(e){
            return {code:500,msg:'Could not perform operation at this time, kindly try again later.',e:e}
        }

    }
}