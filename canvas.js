export function visualizeRawData(canvas, stream, fftSize, type) {
    const [analyser, bufferLength, dataArray] = getData(stream, fftSize);
  
    const canvasCtx = canvas.getContext("2d");
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    draw();
    function draw() {
        requestAnimationFrame(draw);

        if (type == 'frequency') {
            analyser.getByteFrequencyData(dataArray);
        }
        else {
            analyser.getByteTimeDomainData(dataArray);
        }

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 1;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        let sliceWidth = WIDTH / bufferLength;
        let x = 0;

        for(let i = 0; i < bufferLength; i++) {
            let v = dataArray[i] / 128.0;
            let y = HEIGHT - v * HEIGHT / 2;

            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        if (type == 'frequency') {
            canvasCtx.lineTo(WIDTH, HEIGHT);
        }
        else {
            canvasCtx.lineTo(WIDTH, HEIGHT/2);
        }

        canvasCtx.stroke();
    }
}

export function visualizeAggregatedData(canvas, stream, fftSize, type) {
    const [analyser, bufferLength, dataArray] = getData(stream, fftSize);
  
    const canvasCtx = canvas.getContext("2d");
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    let aggregatedData = [];
    draw();
    function draw() {
        requestAnimationFrame(draw);

        if (type == 'frequency') {
            analyser.getByteFrequencyData(dataArray);
        }
        else {
            analyser.getByteTimeDomainData(dataArray);
        }

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 1;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        let sliceWidth = WIDTH / bufferLength;
        let x = 0;

        let newData = 0;
        for(let i = 0; i < bufferLength; i++) {
          newData += dataArray[i];
        }
        newData = newData/bufferLength;
  
        aggregatedData.push(newData);
        if(aggregatedData.length > bufferLength) {
            aggregatedData = aggregatedData.slice(1);
        }  

        for(let i = 0; i < bufferLength; i++) {
            let v = aggregatedData[i] / 128.0;
            let y = HEIGHT - v * HEIGHT / 2;

            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        if (type == 'frequency') {
            canvasCtx.lineTo(WIDTH, HEIGHT);
        }
        else {
            canvasCtx.lineTo(WIDTH, HEIGHT/2);
        }

        canvasCtx.stroke();
    }
}

function getData(stream, fftSize) {
    let audioCtx;
    if(!audioCtx) {
        audioCtx = new AudioContext();
    }

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = fftSize;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    return [analyser, bufferLength, dataArray];
}
