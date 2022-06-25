import { hash } from '../../utils/hashing';
import model from '../../models';
import Constants from '../../utils/constants';

const { User, Role, Permission } = model;

export default {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await Role.bulkCreate([
      { name: Constants.ROLE_SUPER_ADMIN },
      { name: Constants.ROLE_ADMIN },
      { name: Constants.ROLE_MODERATOR },
      { name: Constants.ROLE_AUTHENTICATED },
    ]);

    await Permission.bulkCreate([
      { name: Constants.PERMISSION_VIEW_ADMIN_DASHBOARD },
      { name: Constants.PERMISSION_VIEW_ALL_USERS },
      { name: Constants.PERMISSION_VIEW_ALL_NOMINATIONS },
    ]);

    const superAdminUser = await User.create({
      name: 'Chala Getu',
      email: 'chalagetu@yahoo.com',
      password: hash('password'),
      phone: '+2348123456789',
    });

    const adminUser = await User.create({
      name: 'Chala Getu',
      email: 'ntnlgetu@gmail.com',
      password: hash('password'),
      phone: '+2348123456700',
    });

    const adminRole = await Role.findOne({ where: { name: Constants.ROLE_ADMIN } });
    const adminPermissions = await Permission.findAll({
      where: {
        name: [
          Constants.PERMISSION_VIEW_ADMIN_DASHBOARD,
          Constants.PERMISSION_VIEW_ALL_USERS,
          Constants.PERMISSION_VIEW_ALL_NOMINATIONS
        ],
      },
    });

    await adminUser.addRole(adminRole);
    await adminUser.addPermissions(adminPermissions);

    const superAdminRole = await Role.findOne({ where: { name: Constants.ROLE_SUPER_ADMIN } });
    const superAdminPermissions = await Permission.findAll({
      where: {
        name: [
          Constants.PERMISSION_VIEW_ADMIN_DASHBOARD,
          Constants.PERMISSION_VIEW_ALL_USERS,
          Constants.PERMISSION_VIEW_ALL_NOMINATIONS
        ],
      },
    });
    await superAdminUser.addRole(superAdminRole);
    await superAdminRole.addPermissions(superAdminPermissions);
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await Role.destroy();
    await Permission.destroy();
    await User.destroy();
  },
};
