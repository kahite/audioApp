import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class StreamAnalyzer extends AbstractAnalyzer {
    computeAggregatedData(newData, type) {
        if (type == 'frequency') {
            this.frequencyChunks.push(newData);
            if(this.frequencyChunks.length > this.bufferLength) {
                this.frequencyChunks = this.frequencyChunks.slice(1);
            }  
        }
        else {
            this.timeChunks.push(newData);
            if(this.timeChunks.length > this.bufferLength) {
                this.timeChunks = this.timeChunks.slice(1);
            }  
        }   
    }
}