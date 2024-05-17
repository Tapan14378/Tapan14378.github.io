$(document).ready(function() {
    var $cell = $('.card');

    // Open and close card when clicked on card
    $cell.find('.js-expander').click(function() {
        var $thisCell = $(this).closest('.card');

        if ($thisCell.hasClass('is-collapsed')) {
            $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
            $thisCell.removeClass('is-collapsed').addClass('is-expanded');

            if ($cell.not($thisCell).hasClass('is-inactive')) {
                // Do nothing
            } else {
                $cell.not($thisCell).addClass('is-inactive');
            }
        } else {
            $thisCell.removeClass('is-expanded').addClass('is-collapsed');
            $cell.not($thisCell).removeClass('is-inactive');
        }
    });

    // Close card when clicked on cross
    $cell.find('.js-collapser').click(function() {
        var $thisCell = $(this).closest('.card');

        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        $cell.not($thisCell).removeClass('is-inactive');
    });
});
