import {
	DashboardSquareIcon,
	EngineIcon,
	IdIcon,
	PasswordValidationIcon,
	Qr
} from '@hugeicons/core-free-icons';

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
				},
				{
					title: 'QR Generator',
					url: '/qr-generator',
					icon: Qr
				},
				{
					title: 'Password Generator',
					url: '/password-generator',
					icon: PasswordValidationIcon
				}
			]
		}
	]
};
