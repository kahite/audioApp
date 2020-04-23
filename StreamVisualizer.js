export class StreamVisualizer {
    constructor (streamAnalyzer, canvas, type) {
        this.streamAnalyzer = streamAnalyzer;
        this.canvas = canvas;
        this.type = type
    }

    visualizeRawData(type) {
        return this.visualizeData(type, true);
    }

    visualizeAggregatedData(type) {
        return this.visualizeData(type, false);
    }

    visualizeData(type, isRaw) {
        let that = this;

        draw();
        function draw() {
            requestAnimationFrame(draw);

            that.drawBackground(that.canvas);
            
            that.preDraw(that.canvas);

            let dataArray = that.streamAnalyzer.getRawData(type);
            if (!isRaw) {
                dataArray = that.streamAnalyzer.getAggregatedData(type);
            }
            that.drawPath(that.canvas, dataArray);
            
            that.postDraw(that.canvas);
        }
    }

    drawBackground(canvas) {
        const canvasCtx = canvas.getContext("2d");

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    }

    preDraw(canvas) {

    }

    drawPath(canvas, dataArray) {
        const canvasCtx = canvas.getContext("2d");
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
    
        canvasCtx.lineWidth = 1;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        let sliceWidth = WIDTH / dataArray.length;
        let x = 0;

        for(let i = 0; i < dataArray.length; i++) {
            let v = dataArray[i] / 128.0;
            let y = HEIGHT - v * HEIGHT / 2;

            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.stroke();
    }

    postDraw(canvas) {

    }
}
