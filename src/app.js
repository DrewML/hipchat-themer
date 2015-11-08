import {isFileHipChatApp, $} from 'utils';

let input = $('.hipchat-app-location');

input.addEventListener('change', function(e) {
    let filePath = e.target.files[0].path;
    if (!isFileHipChatApp(filePath)) return console.log('not hipchat!');


});
