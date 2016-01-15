/*global Frontend2, Backbone, JST*/

Frontend2.Views = Frontend2.Views || {};

(function () {
    'use strict';

    Frontend2.Views.QuestionEditView = Backbone.View.extend({

        el: '#rightPanel',
        template: JST['app/scripts/templates/question_edit-view.ejs'],
        events: {
            'click .js-save':'onSave',
            'click .js-canceledit':'onCancel'
        },

        initialize: function () {
            this.on( 'change', this.render);
            this.on( 'reset', this.teardown);
            this.on( 'save:error', this.onSaveResult, true);
            this.on( 'save:success', this.onSaveResult, false);



            //this.listenTo(Frontend2.currentQuestion, 'change', this.onCurrQuestionChange);
        },

        onSave:function(){
            console.log( this.model );
            Frontend2.AppController.trigger('question:save',
                {
                    name:$('.js-name',this.el).val(),
                    type:'radiobox',
                    taxonomy:$('.js-taxonomy',this.el).val(),
                    prompt: $('.js-prompt',this.el).val()
            })
        },   
        onSaveResult:function(result){
            console.log( result );
            //this.model.save();
        },               
        onCancel:function(){
            this.hide();
        },

        render: function () {
            if( typeof Frontend2.currentquestion == 'undefined' ) return;

            console.log(Frontend2.currentquestion);
            this.$el.html(this.template(Frontend2.currentquestion.toJSON()));
            this.show();
        },
        resize:function(e){
            console.log(e);
            this.$el.height( e.height );
        },
        show:function(){
            this.$el.css({right:0});
            $(window).resize(this.onResize);
        },
        hide:function(){
            this.$el.css({right:-9900});
            window.location.hash = window.location.hash.split('/question')[0];
            //window.location.hash = window.location.hash.replace(\/que\S*/g, '');

        },
        teardown:function(){
            //c/onsole.log('teardown - view:exam_detail');
            this.$el.html();
            this.render();
        }
    });

})();
