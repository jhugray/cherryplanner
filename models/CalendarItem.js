const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CalendarItem extends Model {}

CalendarItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    completionStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      //no timestamp
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'calendaritem'
  }
);

module.exports = CalendarItem;