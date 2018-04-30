import Dashboard from 'views/dashboard/dashboard';
import ProjectCreate from 'views/project/project-create';
import DatasourceCreate from 'views/datasource/datasource-create';

import { routes as projectRoutes } from 'routes/project';

var routes = [
    {
        path: "/",
        component: Dashboard
    },
    {
        path: "/projects/new",
        component: ProjectCreate
    },
    {
        path: "/:id/datasources/new",
        component: DatasourceCreate
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
