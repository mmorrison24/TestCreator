var createNewAnswer = function(req, res) { // create a answer (accessed at POST http://localhost:8080/api/answers)
		console.log(req.body);

		//convert creator_id into a number
		var creator_id = req.body.creator_id;
		if( isNaN( creator_id ) || creator_id == '' ) {
			creator_id = 0;
			console.log( 'creator_id:',creator_id );
		}
		creator_id = parseInt( creator_id );

		Answer.create({  // set the answer name (comes from the request)
			
			name			: req.body.name,
			content_type	: req.body.content_type,
			content			: req.body.content,
			order			: req.body.order,
			type			: req.body.type,
			created_ip		: req.body.created_ip,
			creator_id		: creator_id,
			status			: req.body.status

		})
		.complete(function(err, new_answer){
			if(err)
				res.send(err);
			else{
				res.json({ message: 'Answer created!', success: true });
			}

		});
};

var getAllAnswers = function(req, res) {
		Answer.findAll().complete(function(err,answer){
			if( err )
				res.send.json(err);
			res.json(answer)
		});
	};

var getAnswer = function(req, res) {
		Answer
			.find({where: { id : req.params.answer_id} })
			.complete( function(err, answer) {
				if (err)
					res.send(err);
				res.json(answer);
			});
	};

var updateAnswer = function(req, res) {// update the answer with this id (accessed at PUT http://localhost:8080/api/answer/:answer_id)

		Answer
			.find({where: { id : req.params.answer_id} })
			.complete( function(err, answer) {
				if (err)
					res.send(err);
				Answer
					.save({  // set the answer name (comes from the request)
						
						name:req.body.name
					})
					.complete(function(err, new_answer){
						if(err)
							res.send(err);
						else{
							res.json({ message: 'Answer created!', success: true });
						}

					});
			});
	};

var deleteAnswer = function(req, res) {
		Answer
			.find({where: { id : req.params.answer_id} })
			.complete( function(err, answer) {
				if (err)
					res.send(err);
				console.log(answer);
				answer
					.save({  // set the answers name (comes from the request)
						
						status:'deleted'
					})
					.complete(function(err, deleted_answer){
						if(err)
							res.send(err);
						else{
							res.json({ message: 'Answer deleted!', success: true });
						}

					});					
			});
	};	

var route_funcs = {

	onCreate: createNewAnswer,
	onRetrieve: getAllAnswers,

	//id based methods
	onGetId: getAnswer,
	onUpdateId: updateAnswer,
	onDeleteId: deleteAnswer
}

module.exports = route_funcs;