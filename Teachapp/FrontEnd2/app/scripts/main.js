/*global app, $*/

Backbone.emulateJSON = false;
window.Frontend2 = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    AppController: {},
    init: function () {
        'use strict';


        this.AppController.intialize();

        this.exams.fetch({reset: true});
        
        //_.extend(this.AppController, Backbone.Events);
        //setupAppController( this.AppController );

        //this.AppController.trigger('setup');
        Frontend2.AppController.trigger('setup');

    }
};



$(document).ready(function () {
    'use strict';
    Frontend2.init();
});

