/*global Frontend2, Backbone*/

Frontend2.Models = Frontend2.Models || {};

(function () {
    'use strict';

    Frontend2.Models.Test = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
