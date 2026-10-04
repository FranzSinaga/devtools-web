# System Monitoring

Shows CPU, memory, and OS stats of the machine running the SvelteKit server. Route: none yet (intended for the Dashboard at `/`).

## How it works

- `getOsSummary` is a remote `query` that reads `node:os`: CPU model/cores, CPU usage (two samples of `os.cpus()` times 100 ms apart), memory total/free/used/percentage, platform, hostname, uptime, arch, Node version, plus a timestamp formatted with `toLocaleDateString`/`toLocaleTimeString` (`en-GB`, e.g. `04 October 2026 14:41:13`). It also reads Node's global `navigator` (`hardwareConcurrency`, `platform`).
- `summaryQueries.get()` polls it every 2 s, including when the tab is in the background.
- The component dumps the response as JSON.

## Files

- `system.remote.ts`: `getOsSummary` remote function (server only).
- `query.ts`: `summaryQueries` TanStack `queryOptions` factory.
- `system-monitoring.svelte`: stat cards + JSON output.

## Limitations

- Not rendered anywhere: `src/routes/+page.svelte` is empty.
- The four stat cards are hardcoded placeholders, not bound to query data.
- Stats are of the server host, not the user's machine.
- Lives at `src/lib/features/system-monitoring/`, not under a group folder like the other features.
