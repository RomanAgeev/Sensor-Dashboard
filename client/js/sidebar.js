import { mediaSmall } from './utils';

export const sidebar = ($ => (placeholderId, itemSelected) => {
    const selectItem = itemId => {
        if (!itemId) {
            return;
        }

        $(`#${placeholderId} .item`).each(function() {
            if ($(this).data('item') === itemId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        itemSelected(itemId);
    }

    $(`#${placeholderId} .item`).each(function() {
        $(this).on('click', function(e) {
            selectItem($(e.target).data('item'));
        });
    });

    $(`#${placeholderId} .collapse-button`).on('click', function() {
        $(`#${placeholderId}`).removeClass('visible');
    });

    $(`#${placeholderId}-small .expand-button`).on('click', function() {
        $(`#${placeholderId}`).addClass('visible');
    });

    $(window).resize(function() {
        if(window.innerWidth <= mediaSmall) {
            $(`#${placeholderId}`).removeClass('visible');
        }
    });

    return {
        selectItem,
    };
})(jQuery);
