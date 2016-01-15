/*global Frontend2, Backbone*/

Frontend2.Models = Frontend2.Models || {};

(function () {
    'use strict';

    Frontend2.Models.Question = Backbone.Model.extend({

        url: 'http://do1.prideofconcept.com:33310/api/questions',

        initialize: function() {
        },

        defaults: {

            name        : '',
            type        : 'radiobox',          //('textinput','select','boolean','checkbox','radiobox')
            content_type: 'text',               //('video','text','image','audio')
            taxonomy    : 'knowledge',          //('knowledge','comprehension','application','analysis','synthesis','evaluation'),
            instructions: 'Select correct answer',
            prompt      : '',
            timelimit   : null,
            status      : 'valid',
            created_ip  : '192.168.1.1',        //('pending','valid','expired','deleted')
            creator_id  : 1,
            owner_id    : 1,
            expiryDate  : null    
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
