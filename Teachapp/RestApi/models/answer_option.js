//Question.js

// /models/question_option.js
// Options used in Questions

module.exports = function(sequelize, DataTypes) {

	//define model ==================
	return sequelize.define('AnswerOption', {
		name: DataTypes.STRING(65),
		content_type: DataTypes.ENUM('video','text','image','music'),
		content: DataTypes.STRING(65),
		order: DataTypes.INTEGER,
		status: DataTypes.ENUM('pending','valid','expired','deleted'),

		created_ip: DataTypes.STRING(15),
  		creator_id:{
			type: DataTypes.INTEGER,
			refrences:"User",
			refrencesKey: "id"
		}
	});
}
