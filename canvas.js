export function visualizeAggregatedData(canvas, stream, fftSize, type) {
    const [analyser, bufferLength, dataArray] = getData(stream, fftSize);
  
    const canvasCtx = canvas.getContext("2d");
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    
    let offsetDragLeft = 0;
    let offsetDragRight = WIDTH;
    let offsetDragX = 0;
    let state = 'dragLeft';
    canvas.onmousemove = function (event) {
        var rect = canvas.getBoundingClientRect();
        offsetDragX = event.clientX - rect.left;
    };
    canvas.onmousedown = function () {
        if (state == 'dragLeft') {
            offsetDragLeft = offsetDragX;
            state = 'dragRight';
        }
        else if (state == 'dragRight') {
            offsetDragRight = offsetDragX;
            state = 'dragLeft';
        }
    };
    canvas.onmouseleave = function () {
        offsetDragX = 0;
        state = 'dragLeft';
    };

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
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(offsetDragLeft, 0, 1, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
        canvasCtx.fillRect(offsetDragLeft-4, 0, 2, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.2)';
        canvasCtx.fillRect(offsetDragLeft-2, 0, 2, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(offsetDragRight, 0, 1, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
        canvasCtx.fillRect(offsetDragRight+3, 0, 2, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.2)';
        canvasCtx.fillRect(offsetDragRight+1, 0, 2, HEIGHT);
        if (state == 'dragLeft') {
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
            canvasCtx.fillRect(offsetDragX-4, 0, 2, HEIGHT);
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.2)';
            canvasCtx.fillRect(offsetDragX-2, 0, 2, HEIGHT);
        }
        else if (state == 'dragRight') {
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
            canvasCtx.fillRect(offsetDragX+3, 0, 2, HEIGHT);
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.2)';
            canvasCtx.fillRect(offsetDragX+1, 0, 2, HEIGHT);
        }
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.5)';
        canvasCtx.fillRect(offsetDragX, 0, 1, HEIGHT);

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
