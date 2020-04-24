import { RecorderPanel } from "./Panels/RecorderPanel";

export class TabHandler {
    constructor () {
        this.tabs = document.querySelectorAll('.tab');
        this.panels = document.querySelectorAll('.panel');

        let that = this;
        for(let i=0; i < this.tabs.length; i++) {
            this.tabs[i].onclick = function() {
                for(let j=0; j < that.panels.length; j++) {
                    that.panels[j].classList.remove('panel-display');
                }
                that.panels[i].classList.add('panel-display');
            }
        }

        new RecorderPanel();
    }
}