//Exam.js

// /models/exam.js
// holds group associations. From classes, teacher groups, and groups by school or county etc
//var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

	//define model ==================
	return sequelize.define('Exam', {
	  	name: DataTypes.STRING(65),
	  	type: DataTypes.ENUM('exam','quiz','other'),
	  	desc: DataTypes.STRING(256),
		status: DataTypes.ENUM('pending','valid','expired','deleted'),
	  	expiryDate: {
	  		type:DataTypes.DATE,
	  		allowNull: true,
			defaultValue: null
	  	},		
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
