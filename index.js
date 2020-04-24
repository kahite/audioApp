import { calculateCorrelation } from './correlate.js';
import { handleRecorder } from './recorder.js';
import { Application } from './src/Application.js';
import { VisualizerPanel } from './src/Panels/VisualizerPanel.js';

const correlation = document.querySelector('.correlation');

let application = new Application();
application.init();

function handleStream(stream) {
    new VisualizerPanel(stream);
    computeCorrelation(stream);

    handleRecorder(stream);
}

function computeCorrelation(stream) {
    const audioCtx = new AudioContext();
  
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.maxDecibels = -10;

    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    
    let dataArray = new Uint8Array(analyser.frequencyBinCount);

    let prevDataArray = [];
    let frameDiff = 0;
    updateCorrelation();
    function updateCorrelation() {
        analyser.getByteFrequencyData(dataArray);
        correlation.textContent = calculateCorrelation(prevDataArray, dataArray);

        prevDataArray = [...dataArray];
        frameDiff++;

        setTimeout(updateCorrelation, 1000);
    }
}