import { TrackAnalyzer } from '../Analyzer/TrackAnalyzer.js';
import { StreamSelector } from '../StreamSelector.js';

export class RecorderPanel {
    constructor() {
        this.Recorder = null;
    }

    init() {
        this.Recorder.init();
        const audio = document.querySelector('audio');
        const canvas6 = document.querySelector('.visualizer6');
    
        audio.onplay = function () {
            let streamAnalyzer = new TrackAnalyzer(audio.captureStream(), 2048);

            let visualizerAggregatedFrequency = new StreamSelector(streamAnalyzer, canvas6);
            visualizerAggregatedFrequency.visualizeAggregatedData('frequency');
        };
    }
}