//main app controller
(function () {
    'use strict';

    Frontend2.AppController = {
    	
        exams:{},
    	sidebar : {},


    	intialize:function(){
	    	
    		Frontend2.questions = new Frontend2.Collections.Questions();

    		//setup : general
	    	this.on("setup", this.setupUI);
	    	//this.setupUI();
	    	//exams
            //this.listenTo('reset',this.exams) ('reset', this.onExamsLoaded );
	    	this.on("exam:setcurrent", this.onCurrentExamChange);
	    	//questions
	    	this.on('question:edit', this.onEditQuestion);
	    	this.on('question:save', this.onSaveQuestion);

			//views
	    	this.examDetailView =  this.examDetailView || new Frontend2.Views.ExamDetail();
	    	this.questionEditPanel = this.questionEditPanel || new Frontend2.Views.QuestionEditView();
    	},



		setupUI:function(){
		    console.log('setupUI action done');
			//$('#sidebar').load('views/ui/Nav_LeftNav.html');//,setupSideBar);

			//create the sidebar view
			this.sidebar = new Frontend2.Views.Sidebar();

			//load html for header
			$('.js-mainheader').load('scripts/templates/static_header.html');
		},


        onExamsLoaded:function(data){
            console.log('exams loaded', data);
        },


		onCurrentExamChange:function(examid){
			console.log('current exam',examid);
			if( typeof Frontend2.exams != 'undefined' ){

				Frontend2.currentexam = Frontend2.exams.get(examid);

				//this.examDetailView =  this.examDetailView || new Frontend2.Views.ExamDetail() ;
				if( typeof Frontend2.currentexam != 'undefined' )
					this.examDetailView.trigger('reset');

				//if( typeof Frontend2.questions != 'undefined' )
				//	_.invoke( Frontend2.questions.toArray(), 'destroy');
				//Frontend2.questions = new Frontend2.Collections.Questions()
				Frontend2.questions.url = 'http://do1.prideofconcept.com:33310/api/exams/'+examid+'/questions';
				Frontend2.questions.fetch();
			}
			else{
				console.log('frontend exams dne');
			}
		},

		onEditQuestion:function(questionid){
			console.log('current exam',questionid);
			if( typeof Frontend2.questions != 'undefined' ){

				if( questionid )
					Frontend2.currentquestion = Frontend2.questions.get(questionid);
				else{// creating a new question
					var newQuestion = new Frontend2.Models.Question();
					//Frontend2.questions.add( newQuestion );
					Frontend2.currentquestion = newQuestion;
				}
				this.questionEditPanel.trigger('reset');


			}
			else{
				console.log('questions collection dne, we need to create it at global.js')
			}
		},
		onSaveQuestion:function( formData ){
			console.log('onSaveQuestion');
			//save current question
			if( typeof Frontend2.questions != 'undefined' ){

				if( Frontend2.currentquestion ){
					var saveOptions = {
						success:function(){
							this.questionEditPanel.trigger('save:success');
							console.log('save of question success');
						},
						error:function(model,error){
							this.questionEditPanel.trigger('save:error',error);
							console.log('save of question error');
						}
					}
					Frontend2.currentquestion.set(formData);
					Frontend2.currentquestion.set( {exam_id : Frontend2.currentexam.get('id') } );
					console.log( Frontend2.currentquestion.toJSON() );
					Frontend2.currentquestion.save( saveOptions );
					//Frontend2.questions.add( Frontend2.currentquestion );
				}

				


			}
			else{
				console.log('questions collection dne, we need to create it at global.js')
			}
		}		
    }

	_.extend(Frontend2.AppController, Backbone.Events);

    




})();





