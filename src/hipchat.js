import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';
import Promise from 'bluebird';

const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const jsdomEnv = Promise.promisify(jsdom.env);

const TARGET_FILE = '/Contents/Resources/chat.html';

// Tagged on every injected style for easy removal later
const CUSTOM_CLASS = 'custom-user-theme';

export function injectCSS(appPath, cssFilePath) {
    let target = path.join(appPath, TARGET_FILE);

    return Promise.all([
        readFile(target, 'utf-8'),
        readFile(cssFilePath, 'utf-8')
    ]).spread((html, css) => {
        return jsdomEnv(html).then(window => {
            injectStyle(window.document, css);
            // Note: serializeDocument is both slow (on a doc this size)
            // and synchronous
            return jsdom.serializeDocument(window.document);
        });
    }).then(newHTML => writeFile(target, newHTML));
}

function injectStyle(document, css) {
    let styleTag = document.createElement('style');
    styleTag.textContent = css;
    styleTag.classList.add('custom-user-theme');
    document.head.appendChild(styleTag);
}

function removeCustomStyles(document) {
    let styles = document.querySelectorAll(`.${CUSTOM_CLASS}`);
    let total = styles.length;
    Array.from(styles).forEach(el => el.parentElement.removeChild(el));
    return total;
}

export function clearCustomThemes(appPath) {
    let target = path.join(appPath, TARGET_FILE);
    let total;

    return readFile(target, 'utf-8').then(html => {
        return jsdomEnv(html).then(window => {
            total = removeCustomStyles(window.document);
            return jsdom.serializeDocument(window.document);
        });
    }).then(newHTML => writeFile(target, newHTML)).then(() => {
        return total;
    });
}
