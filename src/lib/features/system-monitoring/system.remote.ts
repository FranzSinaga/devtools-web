import os from 'node:os';
import { query } from '$app/server';
import { dev } from '$app/environment';
import dayjs from 'dayjs';

export const getOsSummary = query(async () => {
	if (dev) console.log('OS Summary requested');
	const cpus = os.cpus();

	const totalMem = os.totalmem();
	const freeMem = os.freemem();
	const usedMem = totalMem - freeMem;
	const info = {
		cores: navigator.hardwareConcurrency,
		platform: navigator.platform,
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
		timestamp: dayjs(new Date().toISOString()).format('DD MMMM YYYY HH:mm:ss')
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
