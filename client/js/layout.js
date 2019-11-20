import { sidebar } from './sidebar';
import { fetchData } from './channel';
import { dashboardFactory } from './dashboards';

const initialDashoard = 'distributionDashboard';

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
    
    try {
        data = await fetchData();
    } catch (e) {
        console.warn(e);
        return;
    }

    bar.selectItem(initialDashoard);
})(jQuery);

export default layout;