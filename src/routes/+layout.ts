import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

import type { LayoutLoad } from './$types';

export const ssr = false;

export const csr = true;

export const prerender = false;

export const load: LayoutLoad = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000,
				refetchOnWindowFocus: false,
				retry: false
			},
			mutations: {
				onError: (error) => {
					console.error(error);
				}
			}
		}
	});

	return { queryClient };
};
