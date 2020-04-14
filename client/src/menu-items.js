export default {
    items: [
        {
            id: 'pages',
            title: 'Pages',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    icon: 'feather icon-home',
                    url: '/dashboard',
                },
                {
                    id: 'draft',
                    title: 'Draft',
                    type: 'item',
                    icon: 'feather icon-edit',
                    url: '/draft',
                },
                {
                    id: 'analize',
                    title: 'Analize',
                    type: 'item',
                    icon: 'feather icon-activity',
                    url: '/analize',
                },
                {
                    id: 'ml',
                    title: 'ML',
                    type: 'item',
                    icon: 'feather icon-cpu',
                    url: '/ml',
                },
                {
                    id: 'settings',
                    title: 'Settings',
                    type: 'item',
                    icon: 'feather icon-sliders',
                    url: '/settings',
                }
            ]
        }
    ]
}