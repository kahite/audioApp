import { PanelHandler } from "./PanelHandler";
import { RecorderPanel } from "./Panels/RecorderPanel";
import { VisualizerPanel } from "./Panels/VisualizerPanel";

export class Container {
    constructor() {
        this.services = {
            'PanelHandler': new PanelHandler(),
            'RecorderPanel': new RecorderPanel(),
            'VisualizerPanel': new VisualizerPanel(),
        };
        let keys = Object.keys(this.services);

        // Add services for properties maching them
        for(let i = 0; i < keys.length; i++) {
            let serviceName = keys[i];
            let props = Reflect.ownKeys(this.services[serviceName]);
            for(let j = 0; j < props.length; j++) {
                let serviceToInject = props[j];
                if(typeof this.services[serviceToInject] != 'undefined') {
                    Reflect.set(this.services[serviceName], serviceToInject, this.services[serviceToInject]);
                }
            }
        }
    }

    getService(serviceName) {
        return (typeof this.services[serviceName] != 'undefined') ? this.services[serviceName] : null;
    }
}