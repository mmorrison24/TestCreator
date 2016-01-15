/*global Frontend2, Backbone*/

Frontend2.Routers = Frontend2.Routers || {};

(function () {
    'use strict';

    Frontend2.Routers.Router = Backbone.Router.extend({
		routes:{
		      'exam/:id': 'showExam',
		      'exam/:id/question/:id': 'showExamQuestionEdit',
		      '*create/:type' : 'showExamQuestionEdit'
	    },
	    showExam:function(examid){
	    	//c/onsole.log('showing exam:',examid);
	    	Frontend2.AppController.trigger('exam:setcurrent',examid);
	    },
	    showExamQuestionEdit:function(examid, questionid){
	    	//c/onsole.log('showing exam:',examid, questionid);
	    	Frontend2.AppController.trigger('question:edit',questionid);
	    }
    });
    Frontend2.router = new Frontend2.Routers.Router();
	Backbone.history.start({  });
})();
