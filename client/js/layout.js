import { sidebar } from './sidebar';
import { fetchData } from './channel';
import { dashboardFactory } from './dashboards';
import { calcSummary } from './dataEngine';

const layout = ($ => async (sidebarName, contentName) => {
    const contentId = `#${contentName}`;
    
    const dashboardMap = new Map();

    let data = null;
    let summary = null;

    const initDashboard = dashboardId => {
        if (dashboardMap.has(dashboardId)) {
            return;
        }

        const factory = dashboardFactory[dashboardId];
        if (factory) {
            dashboardMap.set(dashboardId, factory(data, summary, dashboardId));
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

    data = (await fetchData()).sensor_data;
    summary = await new Promise((res, _rej) => res(calcSummary(data)));

    return {
        selectDashboard: bar.selectItem,
    };
})(jQuery);

export default layout;