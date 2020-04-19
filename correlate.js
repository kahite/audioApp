export function calculateCorrelation(dataArrayX, dataArrayY) {

    let meanX = calculateMean(dataArrayX);
    let deviationX = calculateDeviation(dataArrayX, meanX);

    let meanY = calculateMean(dataArrayY);
    let deviationY = calculateDeviation(dataArrayY, meanY);

    let correlation = 0;
    for(let i = 0; i < dataArrayX.length; i++) {
        let x = (dataArrayX[i] - meanX) / deviationX;
        let y = (dataArrayY[i] - meanY) / deviationY;
        correlation += x * y;
    }        

    return correlation / (dataArrayX.length - 1);
}

function calculateMean(dataArray) {
    let mean = 0;
    for(let i = 0; i < dataArray.length; i++) {
        mean += dataArray[i];
    }
    return mean / dataArray.length
}

function calculateDeviation(dataArray, mean) {
    let deviation = 0;
    for(let i = 0; i < dataArray.length; i++) {
        deviation += Math.pow(dataArray[i] - mean, 2);
    }
    return Math.sqrt(deviation / (dataArray.length - 1));
}
