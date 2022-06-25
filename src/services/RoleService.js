import model from '../models';
const {Role} = model;

export default {
    async createRole(roleInfo){
        try {
            const {name} = roleInfo;
            let role = await Role.findOne({where: {name: name}});
            if (role) {
                return {code: 422, msg: 'Role with that name already exists'};
            }
            const settings = {
                notification: {
                    push: true,
                    email: true,
                },
            };

            role = await Role.create({
                name:name,
                settings
            });
            return {
                code: 201, 
                data: {
                    role: {
                        id: role.id,
                        name: role.name,   
                    }
                },
                msg:'Role created successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async getAllRoles(){
        try {
            const roles = await Role.findAll()
            return {
                code: 200,
                data: {
                    roles: roles
                }, 
                msg: 'Roles listed successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }

    },

    async getRoleById(roleId){
        try {
            const role = await Role.findByPk(roleId);

            if (!role) {
                return {code: 422, msg:'Role does not exists'};
            }

            return { 
                code: 200, 
                data: {
                    role: role
                }, 
                msg: 'Role fetched successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async updateRoleInfo(roleId,roleInfo){
        try {
            const role = await Role.findByPk(roleId);

            if (!role) {
                return {code: 422, msg: 'Role does not exists'};
            }

            const {name} = roleInfo;
            
            const newRole = await Role.update({
                name:name,
            },{
                where: {
                    id:roleId
                }
            }
            );
            return {
                code: 200,
                data: {
                    role: newRole
                },
                msg: 'Role updated successfully'
            };

        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async deleteRoleById(roleId){
        try {
            const role = await Role.findByPk(roleId);

            if (!role) {
                return {code: 422, msg:'Role does not exists'};
            }

            const deletedRole = await Role.destroy({where:{id:roleId}});
            return {
                code: 200,
                data: {
                    role: deletedRole
                },
                msg: 'Role deleted successfully'
            };
        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async assignPermissionToRole(roleId,permissions){
        try {
            const role = await Role.findByPk(roleId);
            if(role){
                await permissions.forEach((item,index)=> {
                    const permission = await Permission.findByPk(item);
                    if (permission){
                        await role.addPermission(permission);
                    }
                })
            }

            return {
                code: 200,
                data: {role: role},
                msg: 'Permission added to role successfully'
            };

        } catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    }
}

