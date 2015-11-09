import DragAndDrop from 'dragdrop';
import {
    isHipChat, isStyleSheet, addClass, removeClass, disableZoom, $
} from 'utils';
import * as hipchat from 'hipchat';

const DRAG_CLASS = 'drag';
const NO_FILE_CLASS = 'no-file';
const FILE_SEL_CLASS = 'file-selected';

disableZoom();

let dropZones = {
    app: {
        el: $('.app.drop-target'),
        filePath: '',
        validator: isHipChat
    },
    css: {
        el: $('.css.drop-target'),
        filePath: '',
        validator: isStyleSheet
    }
};

let zones = Object.keys(dropZones).map(key => dropZones[key].el);
let dragDrop = new DragAndDrop(zones);

dragDrop.on('dragenter', e => addClass(e.target, DRAG_CLASS));
dragDrop.on('dragleave', e => removeClass(e.target, DRAG_CLASS));

dragDrop.on('drop', e => {
    removeClass(e.target, DRAG_CLASS);

    let path = e.dataTransfer.files[0].path;
    let targetName = Object.keys(dropZones).filter(key => {
        return dropZones[key].el === e.target;
    })[0];
    let isValid = dropZones[targetName].validator(path);
    if (!isValid) return;

    removeClass(e.target, NO_FILE_CLASS);
    addClass(e.target, FILE_SEL_CLASS);
    dropZones[targetName].filePath = path;
});

$('.apply-styles').addEventListener('click', e => {
    // TODO: Validate necessary files have been selected
    
    let {app, css} = dropZones;
    hipchat.injectCSS(app.filePath, css.filePath);
});
