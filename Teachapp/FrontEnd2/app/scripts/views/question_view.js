/*global Frontend2, Backbone, JST*/

Frontend2.Views = Frontend2.Views || {};

(function () {
    'use strict';

    Frontend2.Views.QuestionView = Backbone.View.extend({

        template: JST['app/scripts/templates/question_view.ejs'],

        tagName: 'tr',

        events: {
            'click':'onClick'
        },

        initialize: function () {
            this.on('change', this.render);
        },

        render: function (  ) {
            var elem_indx = this.model.collection.indexOf( this.model );
            this.model.set( {index: elem_indx + 1} )
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        onClick:function(){
            //console.log('question clicked');
            //Frontend2.AppController.trigger('question')
        }
    });

})();
