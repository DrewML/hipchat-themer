import * as modal from 'modal';
import * as hipchat from 'hipchat';
import {$, toggleSpinner} from 'utils';

export default function clearThemeBtnHandler({app}) {
    // TODO: Validate necessary files have been selected
    toggleSpinner();
    hipchat.clearCustomThemes(app.path).then(total => {
        toggleSpinner();
        return modal.open({
            title: 'Success!',
            message: `${total} theme(s) cleared successfully. Restart HipChat to see your changes.`
        });
    }).catch(err => {
        console.error(err);
        toggleSpinner();
        return modal.open({
            title: 'Something went wrong...',
            message: `We're not entirely sure what went wrong. Please report the issue on GitHub.`
        });
    });
}
