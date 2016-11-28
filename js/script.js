$(document).ready(function() {

    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        header: {
            left:   'title',
            center: '',
            right:  'month,basicWeek,basicDay prev,next'
        }
    })

    // hide calendar view
    $('.calendar').hide();

    // display the calendar on click on mobile devices
    $('span.glyphicon-calendar, span.glyphicon-remove-sign').click(function(){
        $('.calendar').toggle();
    });
});

