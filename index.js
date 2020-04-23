import { StreamAnalyzer } from './StreamAnalyzer.js';
import { StreamVisualizer } from './StreamVisualizer.js';
import { calculateCorrelation } from './correlate.js';
import { handleRecorder } from './recorder.js';
import { StreamSelector } from './StreamSelector.js';

const audio = document.querySelector('audio');
const canvas = document.querySelector('.visualizer');
const canvas2 = document.querySelector('.visualizer2');
const canvas3 = document.querySelector('.visualizer3');
const canvas4 = document.querySelector('.visualizer4');
const canvas5 = document.querySelector('.visualizer5');
const canvas6 = document.querySelector('.visualizer6');
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
    let streamAnalyzer = new StreamAnalyzer(stream, 2048);

    let visualizerRawFrequency = new StreamVisualizer(streamAnalyzer, canvas);
    visualizerRawFrequency.visualizeRawData('frequency');

    let visualizerAggregatedFrequency = new StreamSelector(streamAnalyzer, canvas2);
    visualizerAggregatedFrequency.visualizeAggregatedData('frequency');

    let visualizerRawTimeDomain = new StreamVisualizer(streamAnalyzer, canvas3);
    visualizerRawTimeDomain.visualizeRawData('timeDomain');

    let visualizerAggregatedTimeDomain = new StreamVisualizer(streamAnalyzer, canvas4);
    visualizerAggregatedTimeDomain.visualizeAggregatedData('timeDomain');
    
    audio.onplay = function () {
        let streamAnalyzer = new StreamAnalyzer(audio.captureStream(), 2048);

        let visualizerAudioRawFrequency = new StreamVisualizer(streamAnalyzer, canvas5);
        visualizerAudioRawFrequency.visualizeRawData('frequency');

        let visualizerAggregatedFrequency = new StreamSelector(streamAnalyzer, canvas6);
        visualizerAggregatedFrequency.visualizeAggregatedData('frequency');
    };

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