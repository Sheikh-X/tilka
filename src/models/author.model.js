const { DataTypes, Model } = require('sequelize');

const sequelize = require('../config/sequelize');

class Author extends Model {
  // Define any methods or custom logic related to authors here
}

Author.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 50,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 50,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Author',
    underscored: true,
    timestamps: true,
  }
);

module.exports = Author;
