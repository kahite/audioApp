import { StreamAnalyzer } from '../StreamAnalyzer.js';
import { StreamVisualizer } from '../StreamVisualizer.js';
import { StreamSelector } from '../StreamSelector.js';

export class RecorderPanel {
    init() {
        const audio = document.querySelector('audio');
        const canvas5 = document.querySelector('.visualizer5');
        const canvas6 = document.querySelector('.visualizer6');
    
        audio.onplay = function () {
            let streamAnalyzer = new StreamAnalyzer(audio.captureStream(), 2048);

            let visualizerAudioRawFrequency = new StreamVisualizer(streamAnalyzer, canvas5);
            visualizerAudioRawFrequency.visualizeRawData('frequency');

            let visualizerAggregatedFrequency = new StreamSelector(streamAnalyzer, canvas6);
            visualizerAggregatedFrequency.visualizeAggregatedData('frequency');
        };
    }
}