var createNewUser = function(req, res) { // create a user (accessed at POST http://localhost:8080/api/users)
		console.log(req.body);

		//convert creator_id into a number
		var creator_id = req.body.creator_id;
		if( isNaN( creator_id ) || creator_id == '' ) 
			creator_id = 0;
		creator_id = parseInt( creator_id );

		User.create({  // set the users name (comes from the request)
			
			username:req.body.username,
			password:req.body.password,
			level:req.body.level,
			email:req.body.email,
			status:req.body.status,
			title:req.body.title,
			firstname:req.body.firstname,
			lastname:req.body.lastname,
			created_ip:req.body.created_ip,
			creator_id		: creator_id,
			owner_id		: creator_id,
			administrator_id: creator_id,			
			


		})
		.complete(function(err, new_user){
			if(err)
				res.send(err);
			else{
				res.json({ message: 'User created!', success: true });
			}

		});
};

var getAllUsers = function(req, res) {
		User.findAll().complete(function(err,users){
			if( err )
				res.send.json(err);
			res.json(users)
		});
	};

var getUser = function(req, res) {
		User
			.find({where: { id : req.params.user_id} })
			.complete( function(err, user) {
				if (err)
					res.send(err);
				res.json(user);
			});
	};

var updateUser = function(req, res) {// update the qustion with this id (accessed at PUT http://localhost:8080/api/users/:users_id)

		User
			.find({where: { id : req.params.user_id} })
			.complete( function(err, user) {
				if (err)
					res.send(err);
				User
					.save({  // set the users name (comes from the request)
						
						name:req.body.name
					})
					.complete(function(err, new_user){
						if(err)
							res.send(err);
						else{
							res.json({ message: 'User created!', success: true });
						}

					});
			});
	};

var deleteUser = function(req, res) {
		User
			.find({where: { id : req.params.user_id} })
			.complete( function(err, user) {
				if (err)
					res.send(err);
				user
					.save({  // set the users name (comes from the request)
						
						status:'deleted'
					})
					.complete(function(err, deleted_user){
						if(err)
							res.send(err);
						else{
							res.json({ message: 'User deleted!', success: true });
						}

					});					
			});
	};	

var route_funcs = {

	onCreate: createNewUser,
	onRetrieve: getAllUsers,

	//id based methods
	onGetId: getUser,
	onUpdateId: updateUser,
	onDeleteId: deleteUser
}

module.exports = route_funcs;