/*global Frontend2, Backbone*/

Frontend2.Models = Frontend2.Models || {};

(function () {
    'use strict';

    Frontend2.Models.Exam = Backbone.Model.extend({

        url: 'http://do1.prideofconcept.com:33310/api/exams',

        initialize: function() {
        },

        defaults: {
            name:'Invalid Exam',
            type: 'exam',
            desc: 'exam description',
            status: 'valid',
            expiryDate: null,      
            created_ip: '192.168.1.1',
            creator_id:1,
            owner_id:1,  
            administrator_id:1     


      
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
