// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var Sequelize	= require('sequelize');
var cors = require('cors');

var mysqlSettings = require(__dirname + '/settings_mysql.exld');

sequelize = new Sequelize('TeachApp', mysqlSettings.user ,mysqlSettings.pass,{
	host:mysqlSettings.ip,
	dialect:'mysql',
	port:mysqlSettings.port,
	deefine:{
		chareset: 'utf8',
		collate: 'utf8_general_cli'
	}
});

var Exam   = sequelize.import(__dirname + "/models/exam.js");
var Question = sequelize.import(__dirname + "/models/question.js");
var AnswerOption = sequelize.import(__dirname + "/models/answer_option.js");
var Group = sequelize.import(__dirname + "/models/group.js");
var User = sequelize.import(__dirname + "/models/user.js");


Exam
	.hasMany(Question)
	.hasMany(Group)
	.hasOne(User,{foreignKey : 'owner_id'})
	.hasOne(User,{foreignKey : 'creator_id'})
	.hasOne(User,{foreignKey : 'administrator_id'})

Question
	.hasMany(Exam)
	.hasMany(AnswerOption)
	.hasOne(User,{foreignKey : 'owner_id'})
	.hasOne(User,{foreignKey : 'creator_id'})

AnswerOption
	.belongsTo(Question)

Group
	.hasMany(User)
	.hasOne(Exam)
	.hasOne(User,{foreignKey : 'owner_id'})
	.hasOne(User,{foreignKey : 'creator_id'})
	.hasOne(User,{foreignKey : 'administrator_id'})

User
	.hasMany(Group)
	.hasMany(Exam)



sequelize.sync({'force':false});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( cors() );
app.use(bodyParser());
var port = process.env.PORT || 33310; 		// set our port

// REGISTER OUR ROUTES -------------------------------
app.use('/api', require('./routes/api.js')( Exam, Question, User , AnswerOption) );

// START THE SERVER -------------------------------
app.listen(port);
console.log('Magic happens on port ' + port);