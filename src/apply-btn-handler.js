import * as modal from 'modal';
import * as hipchat from 'hipchat';
import {$, toggleSpinner} from 'utils';

export default function applyBtnHandler({app, css}) {
    // TODO: Validate necessary files have been selected
    toggleSpinner();
    hipchat.injectCSS(app.path, css.path).then(() => {
        toggleSpinner();
        return modal.open({
            title: 'Success!',
            message: 'Theme applied successfully. Restart HipChat to see your changes.'
        });
    }).catch(err => {
        toggleSpinner();
        return modal.open({
            title: 'Something went wrong...',
            message: `We're not entirely sure what went wrong. Please report the issue on GitHub.`
        });
    });
}
