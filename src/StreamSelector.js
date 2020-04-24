import { StreamVisualizer } from "./StreamVisualizer.js";

export class StreamSelector extends StreamVisualizer {
    constructor(streamAnalyzer, canvas, type) {
        super(streamAnalyzer, canvas, type);

        this.state = 'dragLeft';
    
        this.offsetDragLeft = 0;
        this.offsetDragRight = canvas.width;
        this.offsetDragX = 0;

        let that = this;
        
        this.canvas.onmousemove = function (event) {
            var rect = that.canvas.getBoundingClientRect();
            that.offsetDragX = event.clientX - rect.left;
        };
        this.canvas.onmousedown = function () {
            if (that.state == 'dragLeft') {
                that.offsetDragLeft = that.offsetDragX;
                that.state = 'dragRight';
            }
            else if (that.state == 'dragRight') {
                that.offsetDragRight = that.offsetDragX;
                that.state = 'dragLeft';
            }
        };
        this.canvas.onmouseleave = function () {
            that.offsetDragX = 0;
            that.state = 'dragLeft';
        };
    }

    preDraw() {
        const canvasCtx = this.canvas.getContext("2d");
        const HEIGHT = this.canvas.height;

        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
        canvasCtx.fillRect(this.offsetDragLeft-4, 0, 5, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.2)';
        canvasCtx.fillRect(this.offsetDragLeft-2, 0, 3, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(this.offsetDragLeft, 0, 1, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
        canvasCtx.fillRect(this.offsetDragRight, 0, 5, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.2)';
        canvasCtx.fillRect(this.offsetDragRight, 0, 3, HEIGHT);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(this.offsetDragRight, 0, 1, HEIGHT);
        if (this.state == 'dragLeft') {
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
            canvasCtx.fillRect(this.offsetDragX-4, 0, 5, HEIGHT);
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.2)';
            canvasCtx.fillRect(this.offsetDragX-2, 0, 3, HEIGHT);
        }
        else if (this.state == 'dragRight') {
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.05)';
            canvasCtx.fillRect(this.offsetDragX, 0, 5, HEIGHT);
            canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.1)';
            canvasCtx.fillRect(this.offsetDragX, 0, 3, HEIGHT);
        }
        canvasCtx.fillStyle = 'rgb(0, 0, 0, 0.3)';
        canvasCtx.fillRect(this.offsetDragX, 0, 1, HEIGHT);
    }
}