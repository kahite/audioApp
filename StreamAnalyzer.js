export class StreamAnalyzer {
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

        if (type == 'frequency') {
            this.frequencyChunks.push(newData);
            if(this.frequencyChunks.length > this.bufferLength) {
                this.frequencyChunks = this.frequencyChunks.slice(1);
            }  
    
            return this.frequencyChunks;
        }
        else {
            this.timeChunks.push(newData);
            if(this.timeChunks.length > this.bufferLength) {
                this.timeChunks = this.timeChunks.slice(1);
            }  
    
            return this.timeChunks;
        }        
    }
}