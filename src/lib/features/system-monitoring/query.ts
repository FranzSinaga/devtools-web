import { queryOptions } from '@tanstack/svelte-query';
import { getOsSummary } from './system.remote';

export const summaryQueries = {
	get: () =>
		queryOptions({
			queryKey: ['system-monitor'],
			queryFn: async () => await getOsSummary(),
			refetchInterval: 2000,
			refetchIntervalInBackground: true
		})
};
