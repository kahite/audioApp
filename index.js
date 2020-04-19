import { visualizeRawData, visualizeAggregatedData } from './canvas.js';
import { calculateCorrelation } from './correlate.js';

const canvas = document.querySelector('.visualizer');
const canvas2 = document.querySelector('.visualizer2');
const canvas3 = document.querySelector('.visualizer3');
const canvas4 = document.querySelector('.visualizer4');
const correlation = document.querySelector('.correlation');

if (navigator.mediaDevices
    && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia ({ audio: true })
        .then(handleStream)
        .catch(function(err) {
            console.log('The following getUserMedia error occured: ' + err);
        });
}


function handleStream(stream) {
    visualizeRawData(canvas, stream, 2048, 'timeDomain');
    visualizeRawData(canvas2, stream, 2048, 'frequency');
    visualizeAggregatedData(canvas3, stream, 2048, 'timeDomain');
    visualizeAggregatedData(canvas4, stream, 2048, 'frequency');
    
    computeCorrelation(stream);
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