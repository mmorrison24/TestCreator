/*global Frontend2, Backbone, JST*/

Frontend2.Views = Frontend2.Views || {};

(function () {
    'use strict';

    Frontend2.Views.ExamDetail = Backbone.View.extend({

        template: JST['app/scripts/templates/exam_detail.ejs'],

        el: '#main-content .js-container',

        events:{
            'click .js-newquestion':'onNewQuestion'
        },

        initialize: function () {
            this.on( 'change', this.render);
            this.on( 'reset', this.teardown);
            this.listenTo(Frontend2.questions, 'add', this.addQuestionToQuestionList);
            this.listenTo(Frontend2.questions, 'sync', this.addAllQuestion);
        },

        onNewQuestion:function(){
            window.location.hash = window.location.hash + '/create/question';
        },        

        addQuestionToQuestionList: function( _question ){
            if( typeof Frontend2.currentexam == 'undefined' ) return

            console.log('view:exam_Detail - question added');
            _question.set({currentexam_id: Frontend2.currentexam.get('id')});
            var view = new Frontend2.Views.QuestionView({ model:_question });
            this.$el.find('.js-questionlist').append( view.render().el );
        },
        addAllQuestion: function( _questions ){
            //c/onsole.log('view:exam_Detail - all question added');
            if( typeof _questions.length != 'undefined' ){
                this.$el.find('.js-questionlist').html('');
                _questions.each(this.addQuestionToQuestionList, this);
            }
            else{
                this.addQuestionToQuestionList( _questions );
            }

        },
        render: function () {
            //c/onsole.log('rendering exam_detailview', this.$el)
            if( typeof Frontend2.currentexam != 'undefined' )
                this.$el.html(this.template(Frontend2.currentexam.toJSON()));
            else
                console.log('in exam_Detail.js currentexam DNE');
        },
        teardown:function(){
            //c/onsole.log('teardown - view:exam_detail');
            this.$el.html();
            this.render();
        }

    });

})();
