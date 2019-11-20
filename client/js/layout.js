import { sidebar } from './sidebar';
import { fetchData } from './channel';
import { dashboardFactory } from './dashboards';

const layout = ($ => async (sidebarName, contentName) => {
    const contentId = `#${contentName}`;
    
    const dashboardMap = new Map();

    let data = null;

    const initDashboard = dashboardId => {
        if (dashboardMap.has(dashboardId)) {
            return;
        }

        const factory = dashboardFactory[dashboardId];
        if (factory) {
            dashboardMap.set(dashboardId, factory(data));
        }
    };

    const onItemSelected = itemId => {
        $(`${contentId} .item`).each(function() {
            if ($(this).attr('id') === itemId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
            initDashboard(itemId);
        });
    };

    const bar = sidebar(sidebarName, onItemSelected);

    data = await fetchData();

    return {
        selectDashboard: bar.selectItem,
    };
})(jQuery);

export default layout;