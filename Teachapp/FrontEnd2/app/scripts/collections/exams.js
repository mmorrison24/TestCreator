/*global Frontend2, Backbone*/

Frontend2.Collections = Frontend2.Collections || {};

(function () {
    'use strict';

    Frontend2.Collections.Exams = Backbone.Collection.extend({

        model: Frontend2.Models.Exam,
        url:'http://do1.prideofconcept.com:33310/api/exams'

    });
    Frontend2.exams = new Frontend2.Collections.Exams();
})();
