import {$} from 'utils';

export default class DragAndDrop {
    constructor(dropZones = []) {
        this.dropZones = dropZones;
        this.listeners = {
            drop: [],
            dragenter: [],
            dragover: [],
            dragleave: []
        }
        this._install();
    }

    on(eventType, cb) {
        let {listeners} = this;
        let availableTypes = Object.keys(listeners);

        if (~availableTypes.indexOf(eventType)) listeners[eventType].push(cb);
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

    _eventCallback(eventType, e) {
        e.preventDefault();
        e.stopPropagation();

        this.listeners[eventType].forEach(listener => listener(e));

        // if (eventType === 'drop') console.log(e.dataTransfer.files[0]);
    }
}
