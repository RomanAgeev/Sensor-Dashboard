const sidebar = ($ => (initialItem, itemSelected) => {
    function selectItem(itemId) {
        if (!itemId) {
            return;
        }

        $('#sidebar .item').each(function() {
            if ($(this).data('item') === itemId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        itemSelected(itemId);
    }

    $('#sidebar .item').each(function() {
        $(this).on('click', function(e) {
            selectItem($(e.target).data('item'));
        });
    });

    $('#sidebar .collapse-button').on('click', function() {
        $('#sidebar').removeClass('visible');
    });

    $('#sidebar-small .expand-button').on('click', function() {
        $('#sidebar').addClass('visible');
    });

    $(window).resize(function() {
        if(window.innerWidth <= 768) {
            $('#sidebar').removeClass('visible');
        }
    })

    selectItem(initialItem);
})(jQuery);

export default sidebar;