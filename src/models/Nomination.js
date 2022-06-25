import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Nomination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Nomination, {  as: 'nominations', foreignKey: 'member_id', onDelete: 'cascade' });
      Nomination.belongsTo(models.User, {as: 'member',foreignKey: 'member_id',onDelete: 'CASCADE',});

    }
  }
  Nomination.init({
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nominee_email: {
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
    description: DataTypes.TEXT,
    candidate_involvement: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: {
          args:[10],
          msg: 'Please enter a candidate involvement score less than or equals to 10',
        },
        min: {
          args:[0],
          msg:'Please enter a candidate involvement score equal to or greater than 0'
        }
      }                  
    },
    overall_talent: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: {
          args:[10],
          msg: 'Please enter a overall talent score less than or equals to 10',
        },
        min: {
          args: [0],
          msg:'Please enter a overall talent score equal to or greater than 0'
        }
      }     
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue: 'Created'
    }
  }, {
    sequelize,
    modelName: 'Nomination',
  });
  return Nomination;
};