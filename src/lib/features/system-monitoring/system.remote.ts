import os from 'node:os';
import { query } from '$app/server';
import { dev } from '$app/environment';

export const getOsSummary = query(async () => {
	if (dev) console.log('OS Summary requested');
	const cpus = os.cpus();

	const totalMem = os.totalmem();
	const freeMem = os.freemem();
	const usedMem = totalMem - freeMem;
	const info = {
		cores: navigator.hardwareConcurrency,
		platform: navigator.platform
	};
	return {
		cpu: {
			cores: cpus.length,
			model: cpus[0]?.model ?? 'Unknown',
			usage: await getCpuUsage()
		},
		memory: {
			total: totalMem,
			free: freeMem,
			used: usedMem,
			percentage: Number(((usedMem / totalMem) * 100).toFixed(2))
		},
		system: {
			platform: os.platform(),
			hostname: os.hostname(),
			uptime: os.uptime(),
			arch: os.arch(),
			nodeVersion: process.version
		},
		info,
		timestamp: formatTimestamp(new Date())
	};
});

async function getCpuUsage(interval = 100) {
	const start = sampleCpu();

	await new Promise((resolve) => setTimeout(resolve, interval));

	const end = sampleCpu();

	const idle = end.idle - start.idle;
	const total = end.total - start.total;

	return total > 0 ? Math.round((1 - idle / total) * 100) : 0;
}

function sampleCpu() {
	const cpus = os.cpus();

	let idle = 0;
	let total = 0;

	for (const cpu of cpus) {
		idle += cpu.times.idle;

		total += cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq;
	}

	return { idle, total };
}

// e.g. "04 October 2026 14:41:13"
function formatTimestamp(d: Date) {
	const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
	return `${date} ${d.toLocaleTimeString('en-GB')}`;
}
