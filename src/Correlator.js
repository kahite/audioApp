export class Correlator {
    calculateCorrelation(dataArrayX, dataArrayY) {

        let meanX = this.calculateMean(dataArrayX);
        let deviationX = this.calculateDeviation(dataArrayX, meanX);

        let meanY = this.calculateMean(dataArrayY);
        let deviationY = this.calculateDeviation(dataArrayY, meanY);

        let correlation = 0;
        for(let i = 0; i < dataArrayX.length; i++) {
            let x = (dataArrayX[i] - meanX) / deviationX;
            let y = (dataArrayY[i] - meanY) / deviationY;
            correlation += x * y;
        }        

        return correlation / (dataArrayX.length - 1);
    }

    calculateMean(dataArray) {
        let mean = 0;
        for(let i = 0; i < dataArray.length; i++) {
            mean += dataArray[i];
        }
        return mean / dataArray.length
    }

    calculateDeviation(dataArray, mean) {
        let deviation = 0;
        for(let i = 0; i < dataArray.length; i++) {
            deviation += Math.pow(dataArray[i] - mean, 2);
        }
        return Math.sqrt(deviation / (dataArray.length - 1));
    }
}