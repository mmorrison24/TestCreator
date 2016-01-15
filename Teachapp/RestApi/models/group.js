//Group.js

// /models/group.js
// holds group associations. From classes, teacher groups, and groups by school or county etc
//var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

	//define model ==================
	return sequelize.define('Group', {
		name: DataTypes.STRING(65),
		type: DataTypes.ENUM('class','subject','user','school','other'),
		desc: DataTypes.STRING(256),
		email: DataTypes.STRING(65),
		expiryDate: DataTypes.DATE,
		creatorip: DataTypes.STRING(15),

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
