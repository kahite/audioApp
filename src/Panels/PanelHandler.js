export class PanelHandler {
    constructor() {
        this.RecorderPanel = null;
        this.MicVisualizerPanel = null;
        this.SelectorPanel = null;
    }

    init () {
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

        this.RecorderPanel.init();
        // this.MicVisualizerPanel.init();
        this.SelectorPanel.init();
    }
}