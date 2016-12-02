$(document).ready(function() {

    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        header: {
            left:   'title',
            center: '',
            right:  'month,basicWeek,basicDay prev,next'
        }
    });

    // sticky calendar
    $('.calendar').stick_in_parent();

    // hide calendar view
    // $('.calendar').hide();

    // display the calendar on click on mobile devices
    $('span.glyphicon-calendar, span.glyphicon-remove-sign').click(function(){
        $('.calendar').toggle();
    });


    // display the remove option for workers
    $('a.label.label-info').hover(function(){
       $(this).children().show();
    }, function () {
        $(this).children().hide();
    });

    // confirm dialog to remove worker from task
    $('#confirmModal').on('show.bs.modal', function(e) {
        // $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var element = $(e.relatedTarget);

        var workerName = element.parent().text().split(/\s+/).slice(0,2).join(" ");
        var taskName = element.parents('.workers-list').siblings('h2').text();

        $(this).find('.modal-body').html('<p>Are you sure you want to remove <strong>' + workerName + '</strong> from the task <strong>' + taskName + '</strong>?</p>');

        $('#confirm-delete').click(function(){
            element.parent().hide();
            $('#confirmModal').modal('toggle');
        });
    });

    // clicked on Mark as complete button, showing the toast!
    $('.marked-complete').click(function () {
        $('.undo').show();
        setTimeout(function() {
            $('.undo').fadeOut('fast');
        }, 5000);

    });


    // filter the task list
    $('.task-list article').each(function(){
        $(this).attr('data-search-term', $(this).text().toLowerCase());
    })

    $('#search-bar-tasks').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();

        $('.task-list article').each(function () {
            if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    })

});

