import { StreamVisualizer } from "./StreamVisualizer.js";
import { Correlator } from "./Correlator.js";

export class SelectionVisualizer extends StreamVisualizer {
    constructor(streamAnalyzer, canvas, selectionData) {
        super(streamAnalyzer, canvas);
    
        this.Correlator = new Correlator();
        this.selectionData = selectionData;
        console.log(selectionData);
        this.counter = 0;
        this.spanCount = document.querySelector('.correlateCount');
        this.spanCorrelation = document.querySelector('.correlation');
    }

    postDraw() {
        const canvasCtx = this.canvas.getContext("2d");
        const HEIGHT = this.canvas.height;

        let subArray = this.getSubArray(this.dataArray, this.dataArray.length - this.selectionData.length, this.selectionData.length);
        let correlation = this.Correlator.calculateCorrelation(
            this.selectionData, 
            subArray
        );
        this.spanCorrelation.textContent = correlation;
        if (correlation > 0.95) {
            console.log(subArray);
            this.counter++;
            this.spanCount.textContent = this.counter;
            canvasCtx.fillStyle = 'rgb(100, 0, 0, 0.1)';
            canvasCtx.fillRect(this.dataArray.length - this.selectionData.length, 0, this.dataArray.length, HEIGHT);
        }
    }

    getSubArray(array, offset, length) {
        let data = [];
        for (let i = offset; i < offset + length; i++) {
            data.push(array[i]);
        }
        return data;
    }
}