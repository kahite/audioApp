export class MicStreamer {
    getStreamPromise() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return navigator.mediaDevices.getUserMedia ({ audio: true });
        } 
    }
}