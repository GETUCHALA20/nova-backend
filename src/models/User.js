import { Model } from 'sequelize';
import  Random  from '../utils/Random';
import {hash,hash_compare} from "../utils/hashing";

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    last_login_at: DataTypes.DATE,
    last_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  /**
   * Create a new personal access token for the user.
   *
   * @return Object
   * @param device_name
   */
   User.prototype.newToken = async function newToken(device_name = 'Web FE') {
    const plainTextToken = Random(40);

    const token = await this.createToken({
      name: device_name,
      token: hash(plainTextToken),
    });

    return {
      accessToken: token,
      plainTextToken: `${token.id}|${plainTextToken}`,
    };
  };
  User.prototype.hasRole = async function hasRole(role) {
    if (!role || role === 'undefined') {
      return false;
    }
    const roles = await this.getRoles();
    return !!roles.map(({ name }) => name)
      .includes(role);
  };
  
  User.prototype.hasPermission = async function hasPermission(permission) {
    if (!permission || permission === 'undefined') {
      return false;
    }
    const permissions = await this.getPermissions();
    return !!permissions.map(({ name }) => name)
      .includes(permission.name);
  };
  
  User.prototype.hasPermissionThroughRole = async function hasPermissionThroughRole(permission) {
    if (!permission || permission === 'undefined') {
      return false;
    }
    const roles = await this.getRoles();
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of permission.roles) {
      if (roles.filter(role => role.name === item.name).length > 0) {
        return true;
      }
    }
    return false;
  };
  
  User.prototype.hasPermissionTo = async function hasPermissionTo(permission) {
    if (!permission || permission === 'undefined') {
      return false;
    }
    return await this.hasPermissionThroughRole(permission) || this.hasPermission(permission);
  };
  

  return User;
};

