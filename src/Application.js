export class Application {
    constructor () {
        this.stream = null;

        let that = this;

        if (navigator.mediaDevices
            && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia ({ audio: true })
                .then(function (stream) {
                    that.stream = stream;
                })
                .catch(function(err) {
                    console.log('The following getUserMedia error occured: ' + err);
                });
        }

        // new PanelHandler();
    }
}