import Promise from 'bluebird';
import {$, addClass, removeClass} from 'utils';

const ENTER = 13;
const ESC = 27;

const titleEl = $('.modal-title');
const messageEl = $('.modal-content');
const modalBtn = $('.modal-ok');
const toggleClasses = ['open-modal', 'overlay'];


function keyboardCb(res, {keyCode:key}) {
    if (key === ENTER || key === ESC) closeModal(res);
}

function closeModal(res) {
    removeClass(document.body, toggleClasses);
    document.body.removeEventListener('keydown', keyboardCb);
    modalBtn.removeEventListener('click', closeModal);
}

export function open({title, message}) {
    titleEl.textContent = title;
    messageEl.textContent = message;
    addClass(document.body, toggleClasses);

    return new Promise((res, rej) => {
        modalBtn.addEventListener('click', () => closeModal(res));
        document.body.addEventListener('keydown', e => keyboardCb(res, e));
    });
}
