var createNewExam = function(req, res) { // create a exam (accessed at POST http://localhost:8080/api/exams)
		console.log(req.body);

		//convert creator_id into a number
		var creator_id = req.body.creator_id;
		if( isNaN( creator_id ) || creator_id == '' ) {
			creator_id = 0;
			console.log( 'creator_id:',creator_id );
		}
		creator_id = parseInt( creator_id );

		Exam.create({  // set the exam name (comes from the request)
			
			name			: req.body.name,
			type			: req.body.type,
			desc			: req.body.desc,
			created_ip		: req.body.created_ip,
			creator_id		: creator_id,
			owner_id		: creator_id,
			administrator_id: creator_id,
			status			: req.body.status

		})
		.complete(function(err, new_exam){
			if(err)
				res.send(err);
			else{
				res.json({ message: 'Exam created!', success: true });
			}

		});
};

var getAllExams = function(req, res) {
		Exam.findAll().complete(function(err,exam){
			if( err )
				res.send.json(err);
			res.json(exam)
		});
	};

var getExam = function(req, res) {
		Exam
			.find({where: { id : req.params.exam_id} })
			.complete( function(err, exam) {
				if (err)
					res.send(err);
				res.json(exam);
			});
	};

var getExamQuestions = function(req, res){

	Exam
		.find({where: { id : req.params.exam_id},include: [ Question ] })
		.complete( function(err, exam) {
			if (err || exam == null){
				res.send(err);
			}
			else{
				exam.getQuestions()
					.success(function(associatedQuestions){
						res.json(associatedQuestions)
					})
					.error(function(err){
						res.send(err);
					})
				}
		});
	};


var updateExam = function(req, res) {// update the exam with this id (accessed at PUT http://localhost:8080/api/exam/:exam_id)

		Exam
			.find({where: { id : req.params.exam_id} })
			.complete( function(err, exam) {
				if (err)
					res.send(err);
				Exam
					.save({  // set the exam name (comes from the request)
						
						name:req.body.name
					})
					.complete(function(err, new_exam){
						if(err)
							res.send(err);
						else{
							res.json({ message: 'Exam created!', success: true });
						}

					});
			});
	};

var deleteExam = function(req, res) {
		Exam
			.find({where: { id : req.params.exam_id} })
			.complete( function(err, exam) {
				if (err)
					res.send(err);
				console.log(exam);
				exam
					.save({  // set the exams name (comes from the request)
						
						status:'deleted'
					})
					.complete(function(err, deleted_exam){
						if(err)
							res.send(err);
						else{
							res.json({ message: 'Exam deleted!', success: true });
						}

					});					
			});
	};	

var route_funcs = {

	onCreate: createNewExam,
	onRetrieve: getAllExams,

	//id based methods
	onGetId: getExam,
	onUpdateId: updateExam,
	onDeleteId: deleteExam,
	onRetrieveFromExam : getExamQuestions
}

module.exports = route_funcs;
