import {
	DashboardSquareIcon,
	EngineIcon,
	FingerPrintIcon,
	IdIcon,
	ParagraphIcon,
	PasswordValidationIcon,
	Qr,
	UserListIcon
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
				},
				{
					title: 'Hash Generator',
					url: '/hash-generator',
					icon: FingerPrintIcon
				},
				{
					title: 'Lorem Ipsum Generator',
					url: '/lorem-ipsum',
					icon: ParagraphIcon
				},
				{
					title: 'Fake Data Generator',
					url: '/fake-data',
					icon: UserListIcon
				}
			]
		}
	]
};
