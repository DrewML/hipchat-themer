const HIPCHAT_APP_PATTERN = /\/HipChat([\w-]+)?.app$/i;
const CSS_FILE_PATTERN = /.css$/i;

export function isFileHipChatApp(filePath) {
    return HIPCHAT_APP_PATTERN.test(filePath);
}

export function isStyleSheet(filePath) {
    return CSS_FILE_PATTERN.test(filePath);
}

export function $(selector) {
    return document.querySelector(selector);
}

export let addClass = toggleClasses.bind(null, true);
export let removeClass = toggleClasses.bind(null, false);

function toggleClasses(show, el, classes) {
    if (!Array.isArray(classes)) classes = [classes];
    
    classes.forEach(className => {
        el.classList[show ? 'add' : 'remove'](className);
    });
}
