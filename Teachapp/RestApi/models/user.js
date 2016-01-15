//User Model

// /models/user.js
// load the things we need
//var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

	//define model ==================
	return sequelize.define('User', {
		username: DataTypes.STRING(65),
		password: DataTypes.STRING(65),
		level: DataTypes.ENUM('free user','student','teacher','qa','dev','admin'),
		email: DataTypes.STRING(65),
		lastlogindate: DataTypes.DATE,
		status: DataTypes.ENUM('active','pending','disabled','suspended','deleted'),
		title: DataTypes.STRING(18),
		firstname: DataTypes.STRING(150),
		lastname: DataTypes.STRING(150),
		lastlogin_ip: DataTypes.STRING(32),
		lastPayment : DataTypes.DATE,
		paidExpiryDate: {
			type:DataTypes.DATE,
			allowNull: true,
		defaultValue: 0
		},
		paymentTracker: DataTypes.STRING(32),
		passwordResetHash: DataTypes.STRING(32),
		created_ip: DataTypes.STRING(15),
		creator_id:{
			type: DataTypes.INTEGER,
			refrences:"User",
			refrencesKey: "id"
		},
		owner_id:{
			type: DataTypes.INTEGER,
			refrences:"User",
			refrencesKey: "id"
		},	
		administrator_id:{
			type: DataTypes.INTEGER,
			refrences:"User",
			refrencesKey: "id"
		}			
	});
}