// can be modified to deconflict with other mods
const headerId = 'restart';
const restartId = 'restart';

export default class RestartButtonMod {
    constructor() {
        this.listeners = [];

        window.restartButton = {
            restart: this.restart.bind(this),
            addListener: this.addListener.bind(this)
        };
    }

    prestart() {
        sc.OPTIONS_DEFINITION['keys-'+restartId] = {
            type: 'CONTROLS',
            init: { key1: ig.KEY.L },
            cat: sc.OPTION_CATEGORY.CONTROLS,
            hasDivider: true,
            header: headerId
        };
    }

    // Legacy compatibility
    main() {
        this.poststart();
    }

    poststart() {
        // localization
        ig.lang.labels.sc.gui.options.controls.keys[restartId] = 'Restart';
        ig.lang.labels.sc.gui.options.headers[headerId] = 'restart';

        ig.game.addons.preUpdate.push(this);
    }

    onPreUpdate() {
        if(ig.input.pressed(restartId)) {
            this.restart();
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    restart(skipListeners = false) {
        if(!skipListeners) {
            for(const listener of this.listeners) {
                listener();
            }
        }
        chrome.runtime.reload();
    }
}
