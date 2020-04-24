import { StreamAnalyzer } from '../StreamAnalyzer.js';
import { StreamVisualizer } from '../StreamVisualizer.js';

export class VisualizerPanel {
    constructor(stream) {
        let streamAnalyzer = new StreamAnalyzer(stream, 2048);

        const canvas = document.querySelector('.visualizer');
        const canvas2 = document.querySelector('.visualizer2');
        const canvas3 = document.querySelector('.visualizer3');
        const canvas4 = document.querySelector('.visualizer4');

        let visualizerRawFrequency = new StreamVisualizer(streamAnalyzer, canvas);
        visualizerRawFrequency.visualizeRawData('frequency');
    
        let visualizerAggregatedFrequency = new StreamVisualizer(streamAnalyzer, canvas2);
        visualizerAggregatedFrequency.visualizeAggregatedData('frequency');
    
        let visualizerRawTimeDomain = new StreamVisualizer(streamAnalyzer, canvas3);
        visualizerRawTimeDomain.visualizeRawData('timeDomain');
    
        let visualizerAggregatedTimeDomain = new StreamVisualizer(streamAnalyzer, canvas4);
        visualizerAggregatedTimeDomain.visualizeAggregatedData('timeDomain');
    }
}