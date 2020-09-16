const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

let infoArray = [
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
	"os-arch",
	'os-release',
	'os-logofile'
];

/* ipcRenderer.on('cpuTemp', (event, data) => {
	console.log(data);
}); */

function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderInfo(infoArray) {
	infoArray.forEach((singleData, index) => {
		ipcRenderer.on(singleData, (event, data) => {
			switch(singleData) {
				case 'cpu-avg-speed':
				case 'cpu-max-speed':
				case 'cpu-min-speed':
					document.querySelector(`#${singleData}`).innerHTML = `${data} Mhz`;
					break;
				case "total-mem":
				case "aval-mem" :
				case "used-mem" :
					document.querySelector(`#${singleData}`).innerHTML = `${data.toFixed(2)} GB`;
					break;
				case "os-logofile":
					document.querySelector(`#${singleData}`).innerHTML = capitalize(data);
					break;
				default:
					document.querySelector(`#${singleData}`).innerHTML = data;
					break;

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

