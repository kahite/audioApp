import { MicVisualizerPanel } from "./Panels/MicVisualizerPanel";
import { PanelHandler } from "./Panels/PanelHandler";
import { RecorderPanel } from "./Panels/RecorderPanel";
import { SelectorPanel } from "./Panels/SelectorPanel";
import { Recorder } from "./Recorder";
import { MicStreamer } from "./Streamers/MicStreamer";
import { Correlator } from "./Correlator";

export class Container {
    constructor() {
        this.services = {
            'Correlator': new Correlator(),
            'MicStreamer': new MicStreamer(),
            'MicVisualizerPanel': new MicVisualizerPanel(),
            'PanelHandler': new PanelHandler(),
            'Recorder': new Recorder(),
            'RecorderPanel': new RecorderPanel(),
            'SelectorPanel': new SelectorPanel(),
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