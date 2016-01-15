var myServerUrl = 'http://do1.prideofconcept.com:33310';


var Question = can.Model({
    findAll: 'GET ' + myServerUrl + '/api/questions',
    findOne: 'GET  ' + myServerUrl + '/api/questions/{id}',
    create: function(attrs) {
        $.post(myServerUrl + '/api/questions', attrs)
        //keep '{Message} created' from firing twice
        return $.Deferred()
    },
    update:  'PUT  ' + myServerUrl + '/api/questions/{id}',
    destroy: 'DELETE  ' + myServerUrl + '/api/questions/{id}'
}, {});

window.Models = window.Models || {};
window.Models.Question = Question;