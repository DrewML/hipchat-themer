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
