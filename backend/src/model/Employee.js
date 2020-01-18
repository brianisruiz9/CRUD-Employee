//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./mysql');
// import model for FK roleID
var Role = require('./Role');

var Employee = sequelize.define('employee', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.BIGINT,
  roleId: {
    type: Sequelize.INTEGER,
    // This is a reference to another model
    references: {
      model: Role,
      key: 'id'
    }
  }
},
{
	 timestamps: false,
});

Employee.belongsTo(Role)

module.exports = Employee