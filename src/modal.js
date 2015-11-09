import Promise from 'bluebird';
import {$, addClass, removeClass} from 'utils';

const titleEl = $('.modal-title');
const messageEl = $('.modal-content');
const modalBtn = $('.modal-ok');
const toggleClasses = ['open-modal', 'overlay'];

export function open({title, message}) {
    titleEl.textContent = title;
    messageEl.textContent = message;
    addClass(document.body, toggleClasses);

    let clickCb = (res) => {
        removeClass(document.body, toggleClasses);
        modalBtn.removeEventListener('click', clickCb);
        res();
    };

    return new Promise((res, rej) => {
        modalBtn.addEventListener('click', () => clickCb(res));
    });
}
