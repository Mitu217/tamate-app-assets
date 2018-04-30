// Dashboard
import Dashboard from 'views/dashboard/dashboard';
// Project
import ProjectCreate from 'views/project/project-create';
import ProjectOverview from 'views/project/project-overview';

const routes = [
    {
        path: "/",
        component: Dashboard
    },
    {
        path: "/project/new",
        component: ProjectCreate
    },
    {
        path: "/project/:id",
        component: ProjectOverview
    },
];

export default routes;
