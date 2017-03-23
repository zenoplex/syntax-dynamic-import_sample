// @flow
/* eslint-disable immutable/no-mutation, no-restricted-syntax, no-undef, no-prototype-builtins, no-continue, max-len */
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

// output window[key]s' to global so it can be used without window
for (const key in window) {
  if (!window.hasOwnProperty(key)) continue;
  if (key in global) continue;

  global[key] = window[key];
}
