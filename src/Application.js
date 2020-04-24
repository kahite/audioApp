import { Container } from "./Container";
// Regenerator runtime allows us to use async/await
import regeneratorRuntime from "../node_modules/regenerator-runtime/runtime";

export class Application {
    constructor () {
        this.stream = null;

        this.container = new Container();
    }

    async init() {
        if (navigator.mediaDevices
        && navigator.mediaDevices.getUserMedia) {
                this.stream = await navigator.mediaDevices.getUserMedia ({ audio: true });
        } 
        let panelHandler = this.container.getService('PanelHandler');
        panelHandler.init(this.stream);
    }
}