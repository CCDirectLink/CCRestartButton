// can be modified to deconflict with other mods
const headerId = 'restart';
const restartId = 'restart';

const cp = nw.require('child_process');

function getScriptsDir() {
    for(const mod of window.activeMods) {
        if(mod.name === 'Restart Button') {
            return mod.baseDirectory + 'scripts/';
        }
    }
    console.error('Failed to find Restart Button mod, did the name change?');
    return null;
}

function getRestartProcessCmd() {
    const dir = getScriptsDir();
    if(dir === null) return null;

    switch(process.platform) {
        case 'win32':
            // Theoretically doing something like this should work, but I could not get it to
            //     cp.spawn(file, [], {shell:true, detached:true, windowsHide:true})
            // github issue that may be relavent: https://github.com/nodejs/node/issues/21825
            // instead I am using `start /B` as a workaround to get a hidden detached process
            return 'start /B ' + dir.replace(/\//g, '\\') + 'windows.bat';
        default:
            console.error('Restarting the process is not supported for \''+process.platform+'\' systems yet.');
            return null;
    }
}

function initialize() {
    const cmd = getRestartProcessCmd();
    if(cmd === null) return;

    // localization
    ig.lang.labels.sc.gui.options.controls.keys[restartId] = 'Restart';
    ig.lang.labels.sc.gui.options.headers[headerId] = 'restart';

    // add option
    const tab = 5;
    const defaultKey = 'L'.charCodeAt(0);
    const defaultKeys = {key1: defaultKey, key2: undefined};
    simplify.options.addEntry('keys-'+restartId, 'CONTROLS', defaultKeys, tab, undefined, undefined, headerId);
    ig.input.bind(defaultKey, restartId); // have to manually bind default keys

    // reload options
    simplify.options.reload();

    // listen for key press
    simplify.registerUpdate(() => {
        if(ig.input.state(restartId)) {
            cp.exec(cmd).unref();
            nw.App.quit();
        }
    });
}

document.body.addEventListener('modsLoaded', initialize);
