export class AbstractAnalyzer {
    constructor(stream, fftSize) {
        let audioCtx;
        if(!audioCtx) {
            audioCtx = new AudioContext();
        }

        this.analyser = audioCtx.createAnalyser();
        this.analyser.fftSize = fftSize;

        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(this.analyser);

        this.initAggregatedData();
    }
    
    initAggregatedData() {
        this.timeChunks = [];
        this.frequencyChunks = [];

        for(let i = 0; i < this.bufferLength; i++) { 
            this.timeChunks.push(0);
            this.frequencyChunks.push(0);
        }
    }

    getRawData (type) {
        if (type == 'frequency') {
            this.analyser.getByteFrequencyData(this.dataArray);
        }
        else {
            this.analyser.getByteTimeDomainData(this.dataArray);
        }

        return this.dataArray;
    }

    getAggregatedData (type) {
        if (type == 'frequency') {
            this.analyser.getByteFrequencyData(this.dataArray);
        }
        else {
            this.analyser.getByteTimeDomainData(this.dataArray);
        }        

        let newData = 0;
        for(let i = 0; i < this.bufferLength; i++) {
          newData += this.dataArray[i];
        }
        newData = newData / this.bufferLength;

        this.computeAggregatedData(newData, type);

        if (type == 'frequency') {
            return this.frequencyChunks;
        }
        else {
            return this.timeChunks;
        }        
    }

    computeAggregatedData(newData, type) {
    }
}