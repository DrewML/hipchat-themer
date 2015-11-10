import DragAndDrop from 'dragdrop';
import applyBtnHandler from 'apply-btn-handler';
import {
    isHipChat,
    isStyleSheet,
    addClass,
    removeClass,
    disableZoom,
    $
} from 'utils';

const DRAG_CLASS = 'drag';
const NO_FILE_CLASS = 'no-file';
const FILE_SEL_CLASS = 'file-selected';

disableZoom();

let dropZones = {
    app: {
        el: $('.app.drop-target'),
        path: '',
        validator: isHipChat
    },
    css: {
        el: $('.css.drop-target'),
        path: '',
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
    dropZones[targetName].path = path;
});

$('.apply-styles').addEventListener('click', () => applyBtnHandler(dropZones));
