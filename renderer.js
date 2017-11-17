// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const $ = require('jquery');
window.$ = $;
window.jQuery = $;

const hammer = require('hammerjs');
window.Hammer = hammer;

const materialize = require('materialize-css');
//Materialize.toast('I am a toast!', 4000) // 4000 is the duration of the toast
