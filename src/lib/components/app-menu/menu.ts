import { DashboardSquareIcon, EngineIcon, IdIcon, SettingsIcon } from '@hugeicons/core-free-icons';

export const menuItems = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/',
			icon: DashboardSquareIcon
		},
		{
			title: 'Generator',
			url: '#',
			icon: EngineIcon,
			items: [
				{
					title: 'UUID Generator',
					url: '/uuid-generator',
					icon: IdIcon
				}
			]
		}
	],
	navSecondary: [
		{
			title: 'Settings',
			url: '#',
			icon: SettingsIcon
		}
	]
};
