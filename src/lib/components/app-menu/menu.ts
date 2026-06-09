import {
	ChartIcon,
	DashboardSquareIcon,
	FolderIcon,
	HelpSquareIcon,
	ListTreeIcon,
	SearchIcon,
	SettingsIcon,
	UserIcon
} from '@hugeicons/core-free-icons';

export const menuItems = {
	navMain: [
		{
			title: 'Dashboard',
			url: '#',
			icon: DashboardSquareIcon
		},
		{
			title: 'UUID Generator',
			url: '/uuid-generator',
			icon: ListTreeIcon
		},
		{
			title: 'Analytics',
			url: '#',
			icon: ChartIcon
		},
		{
			title: 'Projects',
			url: '#',
			icon: FolderIcon
		},
		{
			title: 'Team',
			url: '#',
			icon: UserIcon
		}
	],
	navSecondary: [
		{
			title: 'Settings',
			url: '#',
			icon: SettingsIcon
		},
		{
			title: 'Get Help',
			url: '#',
			icon: HelpSquareIcon
		},
		{
			title: 'Search',
			url: '#',
			icon: SearchIcon
		}
	]
};
