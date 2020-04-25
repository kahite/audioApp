import { TrackAnalyzer } from '../Analyzer/TrackAnalyzer.js';
import { StreamSelector } from '../StreamSelector.js';
import { StreamAnalyzer } from '../Analyzer/StreamAnalyzer.js';
import { SelectionVisualizer } from '../SelectionVisualizer.js';

export class RecorderPanel {
    constructor() {
        this.MicStreamer = null;
        this.Recorder = null;
        this.streamSelector = null;
    }

    init() {
        this.Recorder.init();
        const audio = document.querySelector('.recorderAudio');
        const canvas5 = document.querySelector('.visualizer5');
        const canvas6 = document.querySelector('.visualizer6');
        const correlateButton = document.querySelector('.correlateButton');
        let that = this;

        audio.onplay = function () {
            let trackAnalyzer = new TrackAnalyzer(audio.captureStream(), 2048);

            that.streamSelector = new StreamSelector(trackAnalyzer, canvas5);
            that.streamSelector.visualizeAggregatedData('frequency');
        };

        correlateButton.onclick = async function() {
            let streamAnalyzer = new StreamAnalyzer(await that.MicStreamer.getStreamPromise(), 2048);

            let visualizer = new SelectionVisualizer(streamAnalyzer, canvas6, that.streamSelector.getSelectedChunk());
            visualizer.visualizeAggregatedData('frequency');
        }
    }
}