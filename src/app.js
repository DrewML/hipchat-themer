import DragAndDrop from 'dragdrop';
import {isFileHipChatApp, addClass, removeClass, $} from 'utils';

const DRAG_CLASS = 'drag';
const NO_FILE_CLASS = 'no-file';

let dropZones = {
    app: {
        el: $('.app.drop-target'),
        filePath: ''
    },
    css: {
        el: $('.css.drop-target'),
        filePath: ''
    }
};

let zones = Object.keys(dropZones).map(key => dropZones[key].el);
let dragDrop = new DragAndDrop(zones);

dragDrop.on('dragenter', e => addClass(e.target, DRAG_CLASS));
dragDrop.on('dragleave', e => removeClass(e.target, DRAG_CLASS));

dragDrop.on('drop', e => {
    removeClass(e.target, [DRAG_CLASS, NO_FILE_CLASS]);

    let file = e.dataTransfer.files[0];
    let targetName = Object.keys(dropZones).filter(key => {
        return dropZones[key].el === e.target;
    })[0];

    dropZones[targetName].filePath = file.path;
});
