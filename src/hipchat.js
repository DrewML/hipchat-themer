import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';
import Promise from 'bluebird';

const readFile = Promise.promisify(fs.readFile);
const jsdomEnv = Promise.promisify(jsdom.env);

const TARGET_FILE = '/Contents/Resources/chat.html';

export function injectCSS(appPath, cssFilePath) {
    return Promise.all([
        readFile(path.join(appPath, TARGET_FILE), 'utf-8'),
        readFile(cssFilePath, 'utf-8')
    ]).spread((html, css) => {
        return jsdomEnv(html).tap(console.log.bind(console));
    }).catch(console.error.bind(console));
}
