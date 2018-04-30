// views
import ProjectOverview from 'views/project/project-overview';
import ProjectDatasources from 'views/project/project-datasources';
import ProjectDiff from 'views/project/project-diff';
import ProjectSettings from 'views/project/project-settings';
// icons
import {
    Dashboard,
    Storage,
    Settings,
    CompareArrows,
} from 'material-ui-icons';

export const routes = [
    {
        path: '/',
        primary: 'Overview',
        icon: Dashboard,
        component: ProjectOverview,
    },
    {
        path: '/datasources',
        primary: 'Datasources',
        icon: Storage,
        component: ProjectDatasources,
    },
    {
        path: '/diff',
        primary: 'Diff',
        icon: CompareArrows,
        component: ProjectDiff,
    },
    {
        path: '/settings',
        primary: 'Settings',
        icon: Settings,
        component: ProjectSettings,
    },
];
