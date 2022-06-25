import model from '../models';
const {Permission} = model;

export default {

    async createPermission(permissionInfo){
        try {
            const {name} = permissionInfo;
            let permission = await Permission.findOne({where: {name: name}});
            if (permission) {
                return {code: 422, msg: 'Permission with that name already exists'};
            }
            const settings = {
                notification: {
                    push: true,
                    email: true,
                },
            };

            permission = await Permission.create({
                name:name,
                settings
            });
            return {
                code: 201, 
                data: {
                    permission: {
                        id: role.id,
                        name: role.name,   
                    }
                },
                msg: 'Permission created successfully'
            };

        }catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async getAllPermissions(){
        try {
            const permissions = await Permission.findAll()
            return {
                code: 200,
                data: {
                    permissions: permissions
                },
                msg: 'Permissions listed successfully'
            };
        }catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async getPermissionById(permissionId){
        try {
            const permission = await Permission.findByPk(permissionId);

            if (!permission) {
                return {code: 422, msg: 'Permission does not exists'};
            }

            return {
                code: 200,
                data: {
                    permission: permission
                },
                msg: 'Permission fetched successfully'
            };
        }catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async updatePermissionInfo(permissionId,permissionInfo){
        try {
            const permission = await Permission.findByPk(permissionId);

            if (!permission) {
                return {code:422, msg:'Permission does not exists'};
            }

            const {name} = permissionInfo;
            
            const newPermission = await Permission.update({
                name:name,
            },{
                where: {
                    id:permissionId
                }
            }
            );
            return {
                code: 200, 
                data: {
                    permission: newPermission
                },
                msg: 'Permission updated successfully'
            };
        }catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    },

    async deletePermissionsById(permissionId){
        try {
            const permission = await Permission.findByPk(permissionId);

            if (!permission) {
                return {code:422, msg: 'Permission does not exists'};
            }

            const deletedPermission = await Permission.destroy({where:{id:permissionId}});
            return {
                code:200,
                data: {
                    permission: deletedPermission
                },
                msg: 'Permission deleted successfully'
            };
        }catch(e) {
            return {code: 500, msg: 'Could not perform operation at this time, kindly try again later.',e:e}
        }
    }
}