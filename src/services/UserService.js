import {Op} from 'sequelize';
import model from '../models';
import {hash,hash_compare} from "../utils/hashing";
const {User} = model;

export default {
    async createUser(userInfo){
        const {email, password, name, phone}  = userInfo;
        try {
            let user = await User.findOne({where: {[Op.or]: [{phone}, {email}]}});
            if (user) {
                return {code: 422, msg: 'User with that email or phone already exists'};
            }
            const settings = {
                notification: {
                    push: true,
                    email: true,
                },
            };
            user = await User.create({
                name,
                email,
                password: hash(password),
                phone,
                settings
            });
            return { 
                code: 201, 
                data: { 
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
                },
                msg: 'Account created successfully'};
        } catch(e){
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }   
    },

    async getAllUsers(){
        try {
            const users = await User.findAll()
            return {code:200,data:users,msg:"All registered users"}
        }catch(e){
            return {code:500,msg:'Could not perform operation at this time, kindly try again later.',e:e}
        }

    },

    async getUserById(userId){
        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return {code:422, msg:'User does not exists'};
            }

            return {
                code: 200, 
                data: {
                    user: user
                }, 
                msg: 'User fetched successfully'
            };

        } catch(e) {
            return {code:500,msg:'Could not perform operation at this time, kindly try again later.',e:e} 
        }
    },

    async updateUserInfo(userId,userInfo){
        try {
            const user = await Role.findByPk(userId);

            if (!user) {
                return {code: 422, msg: 'User does not exists'};
            }

            const {name,email,password,phone} = userInfo;
            
            const newUser = await User.update({
                name:name,
                email:email,
                password: hash(password),
                phone:phone
            },{
                where: {
                    id:userId
                }
            }
            );
            return {
                code: 200, 
                data: {
                    user: newUser
                }, 
                msg: 'User updated successfully'
            };
        } catch(e) {
            return {code:500,msg:'Could not perform operation at this time, kindly try again later.',e:e} 
        }
    },

    async deleteUserById(userId){
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return {code: 422, msg: 'User does not exists'};
            }
            const deletedUser = await User.destroy({where:{id:userId}});
            return {
                code: 200, 
                data: {
                    user: deletedUser
                },
                msg:'User deleted successfully'
            };
        } catch(e) {
            return {code:500,msg:'Could not perform operation at this time, kindly try again later.',e:e} 
        }
    }


}