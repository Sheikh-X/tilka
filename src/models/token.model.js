// const mongoose = require('mongoose');
// const { toJSON } = require('./plugins');
// const { tokenTypes } = require('../config/tokens');

// const tokenSchema = mongoose.Schema(
//   {
//     token: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     user: {
//       type: mongoose.SchemaTypes.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD],
//       required: true,
//     },
//     expires: {
//       type: Date,
//       required: true,
//     },
//     blacklisted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // add plugin that converts mongoose to json
// tokenSchema.plugin(toJSON);

// /**
//  * @typedef Token
//  */
// const Token = mongoose.model('Token', tokenSchema);

// module.exports = Token;

const { DataTypes } = require('sequelize');
const { tokenTypes } = require('../config/tokens');
const sequelize = require('../config/sequelize');

const Token = sequelize.define(
  'Token',
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // This should match the name of your User model
        key: 'id',
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [[tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD]],
          msg: 'Invalid token type.',
        },
      },
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Token;
