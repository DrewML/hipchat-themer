'use strict';

let app = require('app');
let BrowserWindow = require('browser-window'); // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

app.on('window-all-closed', app.quit.bind(app));

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 550,
        height: 410,
        'min-width': 550,
        'min-height': 410,
        'max-width': 550,
        'max-height': 410
    });

    mainWindow.loadUrl('file://' + __dirname + '/index-built.html');

    // mainWindow.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
