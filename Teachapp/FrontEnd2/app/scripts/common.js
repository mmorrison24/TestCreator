/*var setupSideBar = function(){

    //---LEFT BAR ACCORDION----
    $(function() {
        $('#nav-accordion').dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: true,
            disableLink: true,
            speed: 'slow',
            showCount: false,
            autoExpand: true,
    //        cookie: 'dcjq-accordion-1',
            classExpand: 'dcjq-current-parent'
        });

//    sidebar toggle
        $('#sidebar').on('click','.fa-bars',function () {
            if ($('#sidebar > ul').is(":visible") === true) {
                $('#main-content').css({
                    'margin-left': '0px'
                });
                $('#sidebar').css({
                    'margin-left': '-210px'
                });
                $('#sidebar > ul').hide();
                $("#container").addClass("sidebar-closed");
            } else {
                $('#main-content').css({
                    'margin-left': '210px'
                });
                $('#sidebar > ul').show();
                $('#sidebar').css({
                    'margin-left': '0'
                });
                $("#container").removeClass("sidebar-closed");
            }
        });


    });

}*/

var setupDashboard = function(fragment){
//setup graphs on Dashboard
    var doughnutData = [
        { value: 70, color:"#FF6B6B" },
        { value : 30, color : "#fdfdfd" }
    ],
    Context = $('#serverstatus01', fragment )[0].getContext("2d");
    var myDoughnut = new Chart( Context ).Doughnut(doughnutData);


    var doughnutData2 = [
        { value: 60,color:"#1c9ca7" },
        { value : 40, color : "#f68275" }
    ],
    Context2 = $('#serverstatus02', fragment )[0].getContext("2d"),
    myDoughnut = new Chart( Context2 ).Doughnut(doughnutData2);

    var doughnutData3 = [
        { value: 60,color:"#2b2b2b" },
        { value : 40, color : "#fffffd" }
    ],
    Context3 = $('#serverstatus03', fragment )[0].getContext("2d"),
    myDoughnut = new Chart( Context3 ).Doughnut(doughnutData3);

}

var Script = function () {




    $(function() {
        function responsiveView() {
            var wSize = $(window).width(),
                wHeight = $(window).height();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
                $('#sidebar > ul').hide();
            }

            if (wSize > 768) {
                $('#container').removeClass('sidebar-close');
                $('#sidebar > ul').show();
            }

            //set rightpanel to correct height
            //console.log( $('footer.site-footer').position().top );
            //$('#rightPanel').height( $('footer.site-footer').position().top - 80 );
        }
        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
    });

//when a question is clicked
$('body').on('click','.js-editable_question', function(e){
    var $this = $(this)
        qid = $this.data('id');

    can.route.attr({subtype:'question_edit',subtypeid:qid});
});


// custom scrollbar
    $("#sidebar").niceScroll({styler:"fb",cursorcolor:"#4ECDC4", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled:false, cursorborder: ''});

    $("html").niceScroll({styler:"fb",cursorcolor:"#4ECDC4", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled:false,  cursorborder: '', zindex: '1000'});

// widget tools

    jQuery('.panel .tools .fa-chevron-down').click(function () {
        var el = jQuery(this).parents(".panel").children(".panel-body");
        if (jQuery(this).hasClass("fa-chevron-down")) {
            jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    });

    jQuery('.panel .tools .fa-times').click(function () {
        jQuery(this).parents(".panel").parent().remove();
    });


//    tool tips

    //$('.tooltips').tooltip();

//    popovers

    //$('.popovers').popover();



// custom bar chart

    if ($(".custom-bar-chart")) {
        $(".bar").each(function () {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }


}();