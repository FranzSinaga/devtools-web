import {
	BinaryCodeIcon,
	DashboardSquareIcon,
	EngineIcon,
	ExchangeIcon,
	FingerPrintIcon,
	IdIcon,
	Link01Icon,
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
					description:
						'Generate UUID v1, v4, v7, ULID, and NanoID identifiers locally in your browser.',
					icon: IdIcon
				},
				{
					title: 'QR Generator',
					url: '/qr-generator',
					description: 'Create QR codes from URLs, text, or contact info, right in your browser.',
					icon: Qr
				},
				{
					title: 'Password Generator',
					url: '/password-generator',
					description:
						'Generate strong, random passwords locally with a cryptographically secure RNG.',
					icon: PasswordValidationIcon
				},
				{
					title: 'Hash Generator',
					url: '/hash-generator',
					description:
						'Compute cryptographic hashes and checksums of text locally in your browser.',
					icon: FingerPrintIcon
				},
				{
					title: 'Lorem Ipsum Generator',
					url: '/lorem-ipsum',
					description:
						'Generate lorem ipsum placeholder paragraphs, sentences, or words for mockups.',
					icon: ParagraphIcon
				},
				{
					title: 'Fake Data Generator',
					url: '/fake-data',
					description:
						'Generate realistic fake people with names, emails, and addresses for testing.',
					icon: UserListIcon
				}
			]
		},
		{
			title: 'Encoder / Decoder',
			url: '#',
			icon: ExchangeIcon,
			items: [
				{
					title: 'Base64',
					url: '/base64',
					description: 'Encode and decode Base64 text, or convert files to Base64 and data URLs.',
					icon: BinaryCodeIcon
				},
				{
					title: 'URL Encode/Decode',
					url: '/url-encoder',
					description: 'Percent-encode and decode URL components locally in your browser.',
					icon: Link01Icon
				}
			]
		}
	]
};
