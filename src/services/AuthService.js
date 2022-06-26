import {Op} from 'sequelize';
import model from '../models';
import {hash,hash_compare} from "../utils/hashing";
const {User} = model;

export default {
    async signUp(userInfo){
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

    async login(loginInfo){
        const { email, password } = loginInfo;
        try {
            const user = await User.findOne({ where: { email: email } });
            if (!user) return {code:400, msg:'Incorrect login credentials. Kindly check and try again'};
            const checkPassword = hash_compare(hash(password), user.password);
            if (!checkPassword) {
                return {code: 400, msg: 'Incorrect login credentials. Kindly check and try again'};
            }

            const token = await user.newToken();
            return {
                code: 200, 
                data: {
                    token: token.plainTextToken,
                    user: {
                        name: user.name,
                        id: user.id,
                        email: user.email,
                    },
                },
                msg: 'Login successfully'};
        }catch(e){
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    }
}