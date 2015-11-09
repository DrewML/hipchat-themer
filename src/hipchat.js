import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';
import Promise from 'bluebird';

const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const jsdomEnv = Promise.promisify(jsdom.env);

const TARGET_FILE = '/Contents/Resources/chat.html';

export function injectCSS(appPath, cssFilePath) {
    let target = path.join(appPath, TARGET_FILE)

    return Promise.all([
        readFile(target, 'utf-8'),
        readFile(cssFilePath, 'utf-8')
    ]).spread((html, css) => {
        return jsdomEnv(html).then(window => {
            let {document} = window;
            document.head.appendChild(createStyleTag(document, css));
            return jsdom.serializeDocument(document);
        }).then(newHTML => {
            return writeFile(target, newHTML);
        });
    });
}

function createStyleTag(document, css) {
    let styleTag = document.createElement('style');
    styleTag.textContent = css;
    styleTag.classList.add('custom-user-theme');
    return styleTag;
}
