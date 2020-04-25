export class SelectorPanel {
    constructor() {

    }

    init() {
        const form = document.querySelector('#fileUploader');

        form.onsubmit = function(event) {
            event.preventDefault();
            console.log(event);
        };
    }
}