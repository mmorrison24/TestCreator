//Question.js

// /models/question.js
// Questions used in tests
//var Sequelize = require('sequelize');
///todo: make content a one to many relationship
module.exports = function(sequelize, DataTypes) {

	//define model ==================
	return sequelize.define('Question', {

		name		: DataTypes.STRING(65),
		type 		: DataTypes.ENUM('textinput','select','boolean','checkbox','radiobox'),
		content_type: DataTypes.ENUM('video','text','image','audio'),
		taxonomy	: DataTypes.ENUM('knowledge','comprehension','application','analysis','synthesis','evaluation'),
		instructions: DataTypes.STRING(256),
		prompt		: DataTypes.STRING(65),
		timelimit	: DataTypes.BIGINT,
		status		: DataTypes.ENUM('pending','valid','expired','deleted'),

		created_ip	: DataTypes.STRING(15),

		creator_id	: {
			type: DataTypes.INTEGER,
			refrences:"User",
			refrencesKey: "id"
		},
		owner_id 	: {
			type: DataTypes.INTEGER,
			refrences:"User",
			refrencesKey: "id"
		},		
		expiryDate	: {
			type:DataTypes.DATE,
			allowNull: true,
			defaultValue: null
		}			
	});
}
