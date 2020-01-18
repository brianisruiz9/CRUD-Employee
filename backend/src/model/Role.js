var Sequelize = require('sequelize');
var sequelize = require('./mysql');

var Role = sequelize.define('role', {
  role: Sequelize.STRING
},
{
	 timestamps: false,
});

module.exports = Role