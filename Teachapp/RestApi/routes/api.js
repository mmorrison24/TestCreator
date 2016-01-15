var express    = require('express'); 		// call express
var api_router = express.Router();

var question_routes = require(__dirname + '/question_routes.js');
var exam_routes = require(__dirname + '/exam_routes.js');
var user_routes = require(__dirname + '/user_routes.js');
var answer_routes = require(__dirname + '/answer_routes.js');



// ROUTES FOR OUR API
// =============================================================================

// all requests
api_router.use(function(req, res, next) {
	console.log('Something is happening.yo');
	next(); // make sure we go to the next routes and don't stop here
});


api_router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});





//QUESTIONS
//  ---------------------------------------------
api_router.route('/questions')
	.put( question_routes.onCreate )
	.post( question_routes.onCreate )
	.get( question_routes.onRetrieve );

//QUESTIONS by ID
//  ---------------------------------------------
api_router.route('/questions/:questions_id')

	// get the question with that id (accessed at GET http://localhost:8080/api/questions/:questions_id)
	.get( question_routes.onGetId )
	.put( question_routes.onUpdateId )
	.delete( question_routes.onDeleteId );

//EXAMS
//  ---------------------------------------------
api_router.route('/exams')
	.post( exam_routes.onCreate )
	.get( exam_routes.onRetrieve );

//EXAM by ID
//  ---------------------------------------------
api_router.route('/exams/:exam_id')
	.get( exam_routes.onGetId )
	.put( exam_routes.onUpdateId )
	.delete( exam_routes.onDeleteId );

//EXAM with Questions
//  ---------------------------------------------
api_router.route('/exams/:exam_id/questions')

	// get the question with that id (accessed at GET http://localhost:8080/api/exams/:exam_id/questions/)
	.get( exam_routes.onRetrieveFromExam )

//USERS
//  ---------------------------------------------
api_router.route('/users')
	.post( user_routes.onCreate )
	.get( user_routes.onRetrieve );

//USERS by ID
//  ---------------------------------------------
api_router.route('/users/:user_id')

	// get the question with that id (accessed at GET http://localhost:8080/api/questions/:user_id)
	.get( user_routes.onGetId )
	.put( user_routes.onUpdateId )
	.delete( user_routes.onDeleteId );



//ANSWERS
//  ---------------------------------------------
api_router.route('/answers')
	.post( answer_routes.onCreate )
	.get( answer_routes.onRetrieve );

//ANSWERS by ID
//  ---------------------------------------------
api_router.route('/answers/:answers_id')

	// get the question with that id (accessed at GET http://localhost:8080/api/questions/:questions_id)
	.get( answer_routes.onGetId )
	.put( answer_routes.onUpdateId )
	.delete( answer_routes.onDeleteId );	

module.exports = function(ExamModel, QuestionModel, UserModel, AnswerOptionModel){

	//setup incoming Serealize Models
	Exam 			= ExamModel;
	Question 		= QuestionModel;
	User 			= UserModel;
	Answer 	= AnswerOptionModel;

	return api_router;

}
