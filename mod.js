// can be modified to deconflict with other mods
const headerId = 'restart';
const restartId = 'restart';

function dependenciesLoaded() {
    // localization
    ig.lang.labels.sc.gui.options.controls.keys[restartId] = 'Restart';
    ig.lang.labels.sc.gui.options.headers[headerId] = 'restart';

    // add option
    const tab = 5;
    const defaultKey = 'L'.charCodeAt(0);
    const defaultKeys = {key1: defaultKey, key2: undefined};
    simplify.options.addEntry('keys-'+restartId, 'CONTROLS', defaultKeys, tab, undefined, undefined, headerId);
    ig.input.bind(defaultKey, restartId); // have to manually bind default keys
    simplify.options.reload(); // apply changes

    // listen for key press
    simplify.registerUpdate(() => {
        if(ig.input.state(restartId)) {
            restart();
        }
    });
}

const listeners = [];
function addListener(listener) {
    listeners.push(listener);
}

function restart(skipListeners = false) {
    if(!skipListeners) {
        for(const listener of listeners) {
            listener();
        }
    }
    chrome.runtime.reload();
}

// public api
window.restartButton = {addListener, restart};

// wait for dependencies to load
document.body.addEventListener('modsLoaded', dependenciesLoaded);
