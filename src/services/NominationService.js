import model from '../models';
import { sendEmail } from '../utils/sendEmail';
require('dotenv').config();

const {Nomination,User} = model;

export default {
    async nominateMember(nominationInfo,userId){
        try {
            const {nominee_email, description, candidate_involvement,overall_talent} = nominationInfo;
            let nomination = await Nomination.findOne({where: {nominee_email: nominee_email}});
            if (nomination) {
                return {code: 422, msg: 'Nominee with that email already exists'};
            }
            const settings = {
                notification: {
                    push: true,
                    email: true,
                },
            };
            const status = 'Created';

            let user = await User.findByPk(userId);

            if (!user) {
                return {code: 422, msg: 'User does not exist'};
            }

            nomination = await Nomination.create({
                member_id:user.id,
                nominee_email,
                description,
                candidate_involvement,
                overall_talent,
                status,
                settings
            });

            if (nomination.overall_talent < 8){
                const mailData = {
                    from:process.env.EMAIL,
                    to:[user.email,nomination.nominee_email],
                    subject:"Update Regarding Your Nomination",
                    text: `Hello, We are sorry to inform you than your nomination has been rejected`
                };
                await sendEmail(mailData);

                await Nomination.update({
                    status: "Rejected"
                },{
                    where: {
                        id:nomination.id
                    }
                }
                );
            }
            
            return { 
                code: 201, 
                data: {
                nomination: {
                    id: nomination.id,
                    user_id: nomination.user_id,
                    nominee_email: nomination.nominee_email,
                    description: nomination.description,
                    candidate_involvement: nomination.candidate_involvement,
                    overall_talent: nomination.overall_talent,
                    status: nomination.status
                }},
                msg: 'Nomination created successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async getAllNominations(){
        try {
            const nominations = await Nomination.findAll({
                include: ["member"],
            })

            return {
                code: 200,
                data: {
                    nominations: nominations
                },
                msg: 'Nomination listed successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async getAllNominationsByUser(userId,paramId){
        try {
            // only allow admins to access other user records
            const current_user = await User.findByPk(userId);
            const isAdmin = await current_user.hasRole('Admin');

            if (userId != paramId && isAdmin == false) {
                return {code: 401, msg: 'You are unauthorized'};
            }
            
            const user = await User.findByPk(paramId);

            if (!user) {
                return {cod: 422, msg: 'Uses does not exists'};
            }

            const nominations = await Nomination.findAll({
                where: {
                    member_id: paramId
                }
            })
            return {
                code: 200, 
                data: {
                    nominator:user,
                    nominations: nominations
                },
                msg:'Nominations listed successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async getNominationById(nominationId){
        try {
            const nomination = await Nomination.findByPk(nominationId);

            if (!nomination) {
                return {code: 422, msg: 'Nomination does not exists'};
            }

            return {
                code: 200, 
                data: {
                    nomination: nomination
                },
                msg: 'Nomination fetched successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async updateNominationInfo(nominationId,updatedNominationInfo){
        try {
            const nomination = await Nomination.findByPk(nominationId);

            if (!nomination) {
                return {code:422, msg: 'Nomination does not exists'};
            }

            const { 
                nominee_email,
                description,
                candidate_involvement,
                overall_talent,
                status } = updatedNominationInfo;
            
            const newNomination = await Nomination.update({
                nominee_email:nominee_email,
                description: description,
                candidate_involvement:candidate_involvement,
                overall_talent: overall_talent,
                status: status
            },{
                where: {
                    id:nominationId
                }
            }
            );
            return {
                code: 200, 
                data: {
                    nomination: newNomination
                },
                msg:'Nomination updated successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async deleteNominationById(nominationId){
        try {
            const nomination = await Nomination.findByPk(nominationId);

            if (!nomination) {
                return {code: 422, msg: 'Nomination does not exists'};
            }
            const deletedNomination = await Nomination.destroy({where:{id:nominationId}});
            return {
                code: 200,
                data: {
                    nomination: deletedNomination
                },
                msg: 'Nomination deleted successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    }

}