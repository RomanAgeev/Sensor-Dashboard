import { sidebar } from './sidebar';
import { fetchData } from './channel';
import { dashboardFactory } from './dashboards';
import { calcDerivatives } from './dataEngine';

const layout = ($ => async (sidebarName, contentName) => {
    const contentId = `#${contentName}`;
    
    const dashboardMap = new Map();

    let data = null;
    let derivatives = null;

    const initDashboard = dashboardId => {
        if (dashboardMap.has(dashboardId)) {
            return;
        }

        const factory = dashboardFactory[dashboardId];
        if (factory) {
            dashboardMap.set(dashboardId, factory(data, derivatives, dashboardId));
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
    derivatives = await new Promise((res, _rej) => res(calcDerivatives(data)));

    return {
        selectDashboard: bar.selectItem,
    };
})(jQuery);

export default layout;