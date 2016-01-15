/*global Frontend2, Backbone*/

Frontend2.Collections = Frontend2.Collections || {};

(function () {
    'use strict';

    Frontend2.Collections.Questions = Backbone.Collection.extend({

        model: Frontend2.Models.Question,
        url:'http://do1.prideofconcept.com:33310/api/questions'

    });
    
})();
