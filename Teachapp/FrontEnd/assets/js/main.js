var gui = require('nw.gui'); 
var win = gui.Window.get();
win.showDevTools();
$('.js-mainheader').load('views/ui/Nav_TopHeader.html');
$('#sidebar').load('views/ui/Nav_LeftNav.html',setupSideBar);
$('#rightPanel').load('views/ui/Panel_Right.html');
//$('#main-content .wrapper').load('views/ui/dashboard.html;');


// Routing ------------------------------------
can.route( ":type", {type: 'dashboard' } );
can.route( ":type/:id/:subtype/:subtypeid" );
//can.route(''});//default raoute

can.route.bind('id', function(ev, newVal, oldVal) {
    //console.log('The hash\'s id changed.');
});
can.route.bind('type', function(ev, newVal, oldVal) {
    console.log('The hash\'s type changed to.', newVal);
    if( oldVal != newVal ){
    	if( typeof dashboard_cntrl != 'undefined') dashboard_cntrl.onRouteChange({type:newVal});
    	if( typeof examview_cntrl != 'undefined') examview_cntrl.onRouteChange({type:newVal});
    	if( typeof questionview_cntrl != 'undefined' )questionview_cntrl.onRouteChange({type:newVal});
    }

});
can.route.bind('subtypeid', function(ev, newVal, oldVal) {
    console.log('The hash\'s subtypeid changed.');
});
can.route.bind('subtype', function(ev, newVal, oldVal) {
    console.log('The hash\'s subtype changed.');

});

can.route.ready();

window.test  = can.route.url({
   type : "questions"
},true)

var dashboard_view = 	can.view.render('views/ui/dashboard.html');

//register the dashboard component for Panel_Main
var dashboard_component = can.Component.extend({
	template:dashboard_view,
	tag:'mp-dashboard',
	scope:{
		active:false,
		onRouteChange : function(data){
        	if( data.type == 'dashboard' )
        		$('#panel_dashboard').fadeIn();
        	else
        		$('#panel_dashboard').fadeOut();
        	//console.log('in dashboard onRouteChange', data.type, ( data.type == 'dashboard' ) )
		}
	},
	events:{
		'route': function(data) {

        	//console.log('in route change event',)
        	this.scope.onRouteChange( can.route.attr() );
    	},
		':type route': function(data) {

        	//console.log('in route change event',can.route.attr() )
        	this.scope.onRouteChange(data);
    	},
		':type/:id route': function(data) {

        	//console.log('in route change event',can.route.attr() )
        	this.scope.onRouteChange(data);
    	}
	},
	init:function(elem, options){
		//console.log('init of dashboard ', can.route.attr() );
		setupDashboard(elem,options);
		this.scope.onRouteChange( can.route.attr());

	}
});

 //control
var dashboard_cntrl = can.Control.extend({
		active:false,
		defaults:{
			view:'views/ui/dashboard.html',
			holder:'#panel_dashboard',
			$holder : $(this.holder),
		},
		init:function(){
			this.onRouteChange( can.route.attr() );
		},
		onRouteChange: function(data){
	    	if( data.type == 'dashboard' )
				$(this.defaults.holder).fadeIn();
	    	else
	    		$(this.defaults.holder).fadeOut();
		}
	},{
		init:function(elem, options){
	    	var self = this;

	        self.element.html( can.view( self.options.view, {  } ) );

		}	
});



//control
var examview_cntrl = can.Control.extend({
		active:false,
		defaults:{
			view:'views/exam/mp-ExamView.html',
			holder:'#panel_examview',
			$holder : $(this.holder),
		},
		init:function(){
			this.onRouteChange( can.route.attr() );
		},
		onRouteChange: function(data){
	    	if( data.type == 'exam' )
				$(this.defaults.holder).fadeIn();
	    	else
	    		$(this.defaults.holder).fadeOut();
		}
	},{
		init:function(elem, options){
	    	var self = this;
	    	window.Models.Exam.findAll({}, function( exams ) {
		        //create a document fragment with can.view and inject it into the provided element's body
		        self.element.html( can.view( self.options.view, { exams : exams } ) );
	    	});	 
		}	
});

var questionview_cntrl = can.Control.extend({
		user: 1,
	  	defaults : { 
	  		view: 'views/question/mp-QuestionView.html',
			holder:'#panel_questionview',
	  	},
	  	init:function(){
    		this.onRouteChange( can.route.attr());
	  	},	
	  	onRouteChange : function(data){
	    	if( data.type == 'questions' )
				$(this.defaults.holder).fadeIn();
	    	else
	    		$(this.defaults.holder).fadeOut();
			//console.log('in questionview onRouteChange. url.type=', data.type, ( data.type == 'questions' ) )
		}
	}, {

		init: function( element , options ) {
	    	var self = this;
	    	window.Models.Question.findAll({}, function( questions ) {
		        //create a document fragment with can.view and inject it into the provided element's body
		        self.element.html( can.view( self.options.view, { questions : questions } ) );
	    	});			
	 
		}
});


window.Models.Exam.findAll({},function(Exams){
	new dashboard_cntrl( $('#mp-dashboard') );
	new examview_cntrl( $('#mp-examview') );
	new questionview_cntrl( $('#mp-questionview') );

	$('.js-testlist').append( can.view('views/exam/sidenav-examlist.html',{
		exams: Exams
	},{
		make_link:function(obj,options){
			console.log( obj.hash.type, obj.hash.typeid()  );
			var type = obj.hash.type,
				subtypeid = obj.hash.typeid();
			console.log( type, subtypeid  );				
			var linkvars = {
				type: (obj.hash.type)? obj.hash.type : ""
			}
			return can.route.url({type: type, subtypeid: subtypeid })

		}
	}));
});













