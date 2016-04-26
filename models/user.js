// 'use strict';
// module.exports = function(sequelize, DataTypes) {
//   var user = sequelize.define('user', {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//       // set: function(val) {
//       //   this.setDataValue('username', val.toLowerCase());
//       // }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//       // set: function(val) {
//       //   this.setDataValue('password', val.toLowerCase());
//       // }
//     },
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });
//   return user;
// };

'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};