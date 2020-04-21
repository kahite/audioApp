const audio = document.querySelector('audio');
const startButton = document.querySelector('.startButton');
const stopButton = document.querySelector('.stopButton');

export function handleRecorder(stream) {
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
    };

    let chunks = [];
    recorder.ondataavailable = function (e) {
        chunks.push(e.data);
        let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
        audio.src = URL.createObjectURL(blob);
        chunks = [];
    };
}

