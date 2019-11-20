import { sidebar } from './sidebar';
import { fetchData } from './channel';
import { distributionDashboard } from './dashboards';

const initialDashoard = 'dashboard1';

const layout = ($ => async (sidebarName, contentName) => {
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

    let data = null;
    try {
        data = await fetchData();
    } catch (e) {
        console.warn(e);
        return;
    }

    distributionDashboard(data);
})(jQuery);

export default layout;