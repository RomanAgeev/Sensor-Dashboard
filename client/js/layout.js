import { sidebar } from './sidebar';
import { dashboard } from './dashboard';

const initialDashoard = 'dashboard1';

const layout = ($ => (sidebarName, contentName) => {
    const contentId = `#${contentName}`;

    const onItemSelected = itemId => {
        $(`${contentId} .item`).each(function() {
            if ($(this).attr('id') === itemId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    };

    sidebar(sidebarName, initialDashoard, onItemSelected);

    dashboard();
})(jQuery);

export default layout;