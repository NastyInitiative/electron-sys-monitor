const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

let infoArray = [
	"pc-manufacturer",
	"pc-model",
	"bios-vendor",
	"bios-version",
	"baseboard-manuf",
	"baseboard-model",
	"cpu-avg-speed",
	"cpu-max-speed",
	"cpu-min-speed",
	"cpu-brand",
	"cpu-manuf",
	"cpu-phys-cores",
	"cpu-socket",
	"total-mem",
	"aval-mem",
	"used-mem",
];

/* ipcRenderer.on('cpuTemp', (event, data) => {
	console.log(data);
}); */

function renderInfo(infoArray) {
	infoArray.forEach((singleData, index) => {
		ipcRenderer.on(singleData, (event, data) => {
			if (singleData == 'cpu-avg-speed' ||
				 singleData == 'cpu-max-speed' || 
				 singleData == 'cpu-min-speed') {
				document.querySelector(`#${singleData}`).innerHTML = `${data} Mhz`;
			} else if (singleData == "total-mem" ||
						singleData == "aval-mem" ||
						singleData == "used-mem") {
				document.querySelector(`#${singleData}`).innerHTML = `${data.toFixed(2)} GB`;
			} else {
				document.querySelector(`#${singleData}`).innerHTML = data;
			}
		});
	});
}

renderInfo(infoArray);

ipcRenderer.on("cpu-cores", (event, data) => {
	data.forEach((element, index) => {
		let singleCore = `${element} ${index}`;
	});
});

