import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class TrackAnalyzer extends AbstractAnalyzer {
    constructor(stream, fftSize) {
        super(stream, fftSize);
        this.counter = 0;
    }

    computeAggregatedData(newData, type) {
        if(this.counter > this.bufferLength) {
            return;
        }
        if (type == 'frequency') {
            this.frequencyChunks[this.counter] = newData;
        }
        else {
            this.timeChunks[this.counter] = newData;
        }   
        this.counter++;
    }
}