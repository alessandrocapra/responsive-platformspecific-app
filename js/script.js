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
    if(window.matchMedia("screen and (min-width: 468px)").matches){
        $('.calendar').stick_in_parent();
    }

    // hide calendar view
    // $('.calendar').hide();

    // display the calendar on click on mobile devices
    $('span.glyphicon-calendar, span.glyphicon-remove-sign').click(function(){
        $('.calendar').toggle();
    });


    /*
    *
    * TASKS PAGE
    *
    * */


    // display the remove option for workers
    $('.workers-list').on({
        mouseenter: function(){
            $(this).children().show();
        },
        mouseleave: function () {
            $(this).children().hide();
        }
    }, "a.btn.btn-default");

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

    //modal to add a worker
    $('#addWorkerModal').on('show.bs.modal',function(e){
        var element = $(e.relatedTarget);

        $('#addWorker').click(function(){
            var selectedOption = $('#addWorkerModal select option:selected');
            element.parent().siblings('.workers-list').append('<a href="#0" class="btn btn-default"> '+ selectedOption.text() +' <span class="remove-worker" data-toggle="modal" data-target="#confirmModal">X</span></a>')
            $('#addWorkerModal').modal('hide');
        });

    });

    // clicked on Mark as complete button, showing the toast!
    $('.marked-complete').click(function () {
        $('.undo').show();
        setTimeout(function() {
            $('.undo').fadeOut('fast');
        }, 5000);

        var currentTask = $(this).parents('article');
        currentTask.hide();
        $('.undo a').click(function(){
            currentTask.show();
            $('.undo').fadeOut('fast');
        });

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

    /*
    *
    * END TASKS PAGE
    *
    * */




    /*
    *
    * WORKERS PAGE
    *
    * */

    function addOne(elem){
        return parseInt(elem, 10) + 1;
    }

    function removeOne(elem){
        return parseInt(elem, 10) - 1;
    }

    $('.worker-tasks div').click( function () {
        var $numberOfWorkers = $(this).children('span');

        if($(this).parents('.available').length){
            // it is in available div, move to assigned
            $(this).appendTo($(this).parent().siblings('.assigned'));
            $numberOfWorkers.text(addOne($numberOfWorkers.text()));
        } else {
            // it is in assigned, move to available
            $(this).appendTo($(this).parent().siblings('.available'));
            $numberOfWorkers.text(removeOne($numberOfWorkers.text()));
        }
    });

    /*
     *
     * END WORKERS PAGE
     *
     * */

});

