const si = require('systeminformation');

/* Gets the average CPU speed */
exports.getCpuSpeed =  function(mainWindow) {
	si.cpuCurrentspeed()
			.then(data=> {
				mainWindow.webContents.send('cpu-avg-speed',  data.avg);
				mainWindow.webContents.send('cpu-max-speed', data.max);
				mainWindow.webContents.send('cpu-min-speed', data.min);
				mainWindow.webContents.send('cpu-cores', data.cores);
			})
			.catch(error => console.log('Could not get CPU speed', error));
}

/* Gets the CPU max temperature */
exports.getCpuTemp =  function(mainWindow) {
	si.cpuTemperature()
			.then(data=> {
				if(data.max == -1){
					console.log('Temperature not supported') 
				} else {
					mainWindow.webContents.send('cpuTemp',  data.max);
				}
			})
			.catch(error => console.log('Could not get CPU temperature', error))
}

/* Gets main cpu info */
exports.getCpuInfo = function(mainWindow){
	si.cpu()
			.then(data=>{
				mainWindow.webContents.send('cpu-manuf', data.manufacturer);
				mainWindow.webContents.send('cpu-brand', data.brand);
				mainWindow.webContents.send('cpu-socket', data.socket);
				mainWindow.webContents.send('cpu-governor', data.governor);
				mainWindow.webContents.send('cpu-family', data.family);
				mainWindow.webContents.send('cpu-processors', data.processors);
				mainWindow.webContents.send('cpu-phys-cores', data.physicalCores);
			})
			.catch(error=> console.log('Could not get CPU Info'));
}

/* Gets memory info */
exports.getMemInfo = function(mainWindow){
	si.mem()
			.then(data => {
				mainWindow.webContents.send('total-mem', (data.total/1024)/1000000);
				mainWindow.webContents.send('aval-mem', (data.available/1024)/1000000);
				mainWindow.webContents.send('used-mem', (data.used/1024)/1000000);
			})
			.catch(error => console.log("Could not get memory info"))
}

/* Gets PC info */
exports.getPCInfo = function(mainWindow){
	si.system()
			.then(data => {
				// mainWindow.webContents.send('pc-manufacturer', (data.manufacturer));
				// mainWindow.webContents.send('pc-model', (data.model));
			});
}

/* Gets BIOS info */
exports.getBiosInfo = function(mainWindow){
	si.bios()
			.then(data => {
				mainWindow.webContents.send('bios-vendor', (data.vendor));
				mainWindow.webContents.send('bios-version', (data.version));
			});
}

/* Gets motherboard info */
exports.getBaseBoardInfo = function(mainWindow){
	si.baseboard()
			.then(data => {
				mainWindow.webContents.send('baseboard-manuf', (data.manufacturer));
				mainWindow.webContents.send('baseboard-model', (data.model));
			});
}
/* Gets OS info */
exports.getOsInfo = function(mainWindow){
	si.osInfo()
			.then(data => {
				mainWindow.webContents.send('os-platform', (data.platform));
				mainWindow.webContents.send('os-release', (data.release));
				mainWindow.webContents.send('os-arch', (data.arch));
				mainWindow.webContents.send('os-logofile', (data.logofile));
			});
}



