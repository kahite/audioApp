import { Container } from "./Container";

export class Application {
    constructor () {
        this.container = new Container();
    }

    init() {
        let panelHandler = this.container.getService('PanelHandler');
        panelHandler.init();
    }
}