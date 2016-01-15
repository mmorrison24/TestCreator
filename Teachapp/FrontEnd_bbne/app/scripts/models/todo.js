/*global FrontEndBbne, Backbone*/

FrontEndBbne.Models = FrontEndBbne.Models || {};

(function () {
    'use strict';

    FrontEndBbne.Models.Todo = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            title: '',
            completed: false
        },

        // Toggle the `completed` state of this todo item.
        toggle: function() {
          this.save({
            completed: !this.get('completed')
          });
        },


        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
