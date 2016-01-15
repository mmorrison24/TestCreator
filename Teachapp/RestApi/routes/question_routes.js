var createNewQuestion = function(req, res) { // create a question (accessed at POST http://localhost:8080/api/questions)
		console.log(req.body);

		//convert creator_id into a number
		var creator_id = req.body.creator_id,
			curr_exam = null;
		if( isNaN( creator_id ) || creator_id == '' ) 
			creator_id = 0;
		creator_id = parseInt( creator_id );

		//find current Exam
		Exam
			.find({where: { id : req.body.exam_id } })
			.complete( function(err, exam) {
				if (err)
					res.send(err);
					//step 2, create new question
					Question.create({  // set the questions name (comes from the request)
						
						name		: req.body.name,
						type 		: req.body.type,
						content_type: req.body.content_type,
						taxonomy	: req.body.taxonomy,
						instructions: req.body.instructions,
						prompt		: req.body.prompt,
						timelimit	: req.body.timelimit,
						status		: req.body.status,
						created_ip	: req.body.created_ip,
						creator_id	: creator_id,
						owner_id	: creator_id,
						expiryDate	: req.body.expiryDate

						


					})
					.complete(function(err, new_question){
						if(err)
							res.send(err);
						else{
							//step3, associate exam

							new_question.addExam( exam );

							res.json( new_question );
						}

					});



			});


};

var getAllQuestions = function(req, res) {
		Question.findAll().complete(function(err,questions){
			if( err )
				res.send.json(err);
			res.json(questions)
		});
	};

var getQuestion = function(req, res) {
		Question
			.find({where: { id : req.params.question_id} })
			.complete( function(err, question) {
				if (err)
					res.send(err);
				res.json(question);
			});
	};

var updateQuestion = function(req, res) {// update the qustion with this id (accessed at PUT http://localhost:8080/api/questions/:questions_id)

		Question
			.find({where: { id : req.params.question_id} })
			.complete( function(err, question) {
				if (err)
					res.send(err);
				Question
					.save({  // set the questions name (comes from the request)
						
						name:req.body.name
					})
					.complete(function(err, new_question){
						if(err)
							res.send(err);
						else{
							res.json({ message: 'Question created!', success: true });
						}

					});
			});
	};

var deleteQuestion = function(req, res) {
		Question
			.find({where: { id : req.params.question_id} })
			.complete( function(err, question) {
				if (err)
					res.send(err);
				else{
					console.log(question);
					question
						.save({  // set the questions name (comes from the request)
							
							status:'deleted'
						})
						.complete(function(err, deleted_question){
							if(err)
								res.send(err);
							else{
								res.json({ message: 'Question deleted!', success: true });
							}

						});		
				}
			
			});
	};	

var route_funcs = {

	onCreate: createNewQuestion,
	onRetrieve: getAllQuestions,

	//id based methods
	onGetId: getQuestion,
	onUpdateId: updateQuestion,
	onDeleteId: deleteQuestion
}

module.exports = route_funcs;