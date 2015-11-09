import {$} from 'utils';

export class DragAndDrop {
    constructor(dropZones = []) {
        this.dropZones = dropZones;
        this.listeners = {
            drag: [],
            dragover: []
        }
        this._install();
    }

    on(eventType, cb) {
        let {listeners} = this;
        let availableTypes = Object.keys(listeners);
        if (!~availableTypes.indexOf(eventType)) return;

        listeners[eventType].push(cb);
    }

    _install() {
        let {listeners, dropZones, _eventCallback} = this;
        dropZones.forEach(zone => {
            Object.keys(listeners).forEach(eventType => {
                let cb = _eventCallback.bind(this, eventType);
                zone.addEventListener(eventType, cb);
            });
        });
    }

    _eventCallback(eventType) {
        console.log(eventType);
    }
}
