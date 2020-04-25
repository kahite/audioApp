export class StreamVisualizer {
    constructor (streamAnalyzer, canvas) {
        this.streamAnalyzer = streamAnalyzer;
        this.canvas = canvas;
        this.dataArray = null;
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

            that.drawBackground();
            
            that.preDraw();

            let dataArray = that.streamAnalyzer.getRawData(type);
            if (!isRaw) {
                dataArray = that.streamAnalyzer.getAggregatedData(type);
            }
            that.dataArray = dataArray;
            that.drawPath(dataArray);
            
            that.postDraw();
        }
    }

    drawBackground() {
        const canvasCtx = this.canvas.getContext("2d");

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    preDraw() {

    }

    drawPath(dataArray) {
        const canvasCtx = this.canvas.getContext("2d");
        const WIDTH = this.canvas.width;
        const HEIGHT = this.canvas.height;
    
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

    postDraw() {

    }
}
