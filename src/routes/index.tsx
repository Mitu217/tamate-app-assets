import Dashboard from 'views/dashboard/dashboard';
import ProjectCreate from 'views/project/project-create';
import ProjectOverview from 'views/project/project-overview';

import { routes as projectRoutes } from 'routes/project';

var routes = [
    {
        path: "/",
        component: Dashboard
    },
    {
        path: "/project/new",
        component: ProjectCreate
    },
];

// merge project routes.
projectRoutes.map(route => {
    routes.push({
        path: "/:id" + route.path,
        component: route.component,
    })
});

export default routes;
