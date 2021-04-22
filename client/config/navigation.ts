export interface INavigationRoute {
    displayName: string;
    route: string;
}

export const NAV_ROUTES: INavigationRoute[] = [
    {
        displayName: 'nav.link.todos',
        route: '/todos'
    },
    {
        displayName: 'nav.link.counter',
        route: '/counter'
    }
]