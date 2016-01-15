var myServerUrl = 'http://do1.prideofconcept.com:33310';


var Exam = can.Model({
    findAll: 'GET ' + myServerUrl + '/api/exams',
    findOne: 'GET  ' + myServerUrl + '/api/exams/{id}',
    create: function(attrs) {
        $.post(myServerUrl + '/api/exams', attrs)
        //keep '{Message} created' from firing twice
        return $.Deferred()
    },
    update:  'PUT  ' + myServerUrl + '/api/exams/{id}',
    destroy: 'DELETE  ' + myServerUrl + '/api/exams/{id}'
}, {});

window.Models = window.Models || {};
window.Models.Exam = Exam;