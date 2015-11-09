import DragAndDrop from 'dragdrop';
import {isFileHipChatApp, $, $$} from 'utils';

let dropZones = {
    app: $('.app.drop-target'),
    css: $('.css.drop-target')
};

let zones = Object.keys(dropZones).map(key => dropZones[key]);
let dragDrop = new DragAndDrop(zones);

dragDrop.on('drop', e => {
    let file = e.dataTransfer.files[0];
    let targetName = Object.keys(dropZones).filter(key => {
        return dropZones[key] === e.target;
    })[0];
    console.log(file, targetName);
});

dragDrop.on('dragenter', e => {
    e.target.classList.add('drag');
});

dragDrop.on('dragleave', e => {
    e.target.classList.remove('drag');
});
