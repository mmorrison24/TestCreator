/*global Frontend2, Backbone, JST*/

Frontend2.Views = Frontend2.Views || {};

(function () {
    'use strict';

    Frontend2.Views.Sidebar = Backbone.View.extend({

        template: JST['app/scripts/templates/sidebar.ejs'],

        el:'.js-testlist',
        
        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);

            this.listenTo(Frontend2.exams, 'add', this.addOne);
            this.listenTo(Frontend2.exams, 'reset', this.render);


        },
        addOne:function(){
            //console.log('view:examadded');
            this.render();
        },
        render: function () {
            this.$el.html(this.template({exams:Frontend2.exams.toJSON()}));

            $('#nav-accordion').dcAccordion({
                eventType: 'click',
                autoClose: true,
                saveState: true,
                disableLink: true,
                speed: 'slow',
                showCount: false,
                autoExpand: true,
        //        cookie: 'dcjq-accordion-1',
                classExpand: 'dcjq-current-parent'
            });

        }

    });

})();
