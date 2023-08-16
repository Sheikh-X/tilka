const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const Author = require('./author.model');

class Book extends Model {
  // Define any methods or custom logic related to books here
}

Book.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 10,
        max: 250,
      },
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    underscored: true,
    timestamps: true,
  }
);

Book.belongsTo(Author, { foreignKey: 'author_id' });

module.exports = Book;
