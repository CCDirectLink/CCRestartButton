# CCRestartButton

Adds a button to restart Cross Code without memory leaks.

## Install

Install [CCLoader](https://github.com/CCDirectLink/CCLoader).

[Download a release](https://github.com/bluecheetah001/CCRestartButton/releases) and unpack into the CCLoader mods folder.

To keep the window in the same location after restarting add the option `"id": "CrossCode"` to the `"window"` object in CrossCode's package.json.

## Usage

Press <kbd>L</kbd> to restart the game. This can be configured at the bottom of the Controls tab.

## API

This was designed for my other mod CCTAS (not released yet), though other modders are free to use it and submit issues for extensions.

API is stored in `window.restartButton`.

#### `addListener(listener)`
Adds a listener to be called before restarting the game, either by api or keypress. For example to write data to localstorage to be read back after the game has restarted.
* `listener` : `function` - The listener to run, is not given any parameters and the return value is ignored.

#### `restart([skipListeners])`
Programatically restart the game instead of requiring the user to press a button.
* `skipListeners` : `boolean` - If true listeners will not be run, as if the user had manually closed and restarted the game. Defaults to `false`.
* Does not return.
