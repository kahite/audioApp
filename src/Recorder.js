// Regenerator runtime let us use async/await
import regeneratorRuntime from "../node_modules/regenerator-runtime/runtime";

export class Recorder {
    constructor() {
        this.MicStreamer = null;
    }

    async init() {
        const audio = document.querySelector('.recorderAudio');
        const startButton = document.querySelector('.startButton');
        const stopButton = document.querySelector('.stopButton');
        const correlateButton = document.querySelector('.correlateButton');

        let stream = await this.MicStreamer.getStreamPromise();
        const recorder = new MediaRecorder(stream);
    
        startButton.onclick = function() {
            if(recorder.state != 'recording') {
                startButton.disabled = true;
                stopButton.disabled = false;
                recorder.start();
            }
        };
        stopButton.disabled = true;
        stopButton.onclick = function() {
            if(recorder.state == 'recording') {
                stopButton.disabled = true;
                startButton.disabled = false;
                recorder.stop();
            }
            correlateButton.style.display = 'inline';
        };
    
        let chunks = [];
        recorder.ondataavailable = function (e) {
            chunks.push(e.data);
            let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
            audio.src = URL.createObjectURL(blob);
            chunks = [];
        };
    }
}

