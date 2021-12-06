/* eslint-disable */
/**
 * AnderShell - Just a small CSS demo
 *
 * Copyright (c) 2011-2018, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// Creates initial options
const createOptions = (opts) =>
  Object.assign(
    {},
    {
      banner: 'Hello World',
      prompt: () => '$ > ',
      tickrate: 1000 / 60,
      buflen: 8,
      commands: {},
    },
    opts || {},
  );

// Creates our textarea element
const createElement = (root) => {
  const el = document.createElement('textarea');
  el.contentEditable = true;
  el.spellcheck = false;
  el.value = '';

  root.appendChild(el);

  return el;
};

// Keys that must be ignored

// Sets text selection range
const setSelectionRange = (input) => {
  const length = input.value.length;

  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(length, length);
  } else if (input.createTextRange) {
    const range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', length);
    range.moveStart('character', length);
    range.select();
  }
};

// Gets the font size of an element
const getFontSize = (element) =>
  parseInt(window.getComputedStyle(element).getPropertyValue('font-size'), 10);

// Creates the rendering loop
const renderer = (tickrate, onrender) => {
  let lastTick = 0;

  const tick = (time) => {
    const now = performance.now();
    const delta = now - lastTick;

    if (delta > tickrate) {
      lastTick = now - (delta % tickrate);

      onrender();
    }

    window.requestAnimationFrame(tick);
  };

  return tick;
};

// Pronts buffer onto the textarea
const printer = ($element, buflen) => (buffer) => {
  if (buffer.length > 0) {
    const len = Math.min(buflen, buffer.length);
    const val = buffer.splice(0, len);

    $element.value += val.join('');

    setSelectionRange($element);
    $element.scrollTop = $element.scrollHeight;

    return true;
  }

  return false;
};

// Parses input
const parser = (onparsed) => (str) => {
  if (str.length) {
    const args = str.split(' ').map((s) => s.trim());
    const cmd = args.splice(0, 1)[0];
    console.debug(cmd, args);
    onparsed(cmd, ...args);
  }
};

// Command executor
const executor =
  (commands) =>
  (cmd, ...args) =>
  (cb) => {
    try {
      // cb(''); !!!!!
    } catch (e) {
      console.warn(e);
      cb(`Exception: ${e}\n`);
    }
  };

// Handle keyboard events
const keyboard = (parse, callback) => {
  let input = [];
  const keys = { 8: 'backspace', 13: 'enter' };
  const ignoreKey = (code) => code >= 33 && code <= 40;
  const key = (ev) => keys[ev.which || ev.keyCode];

  return {
    keypress: (ev) => {
      if (key(ev) === 'enter') {
        const str = input.join('').trim();
        if (callback) callback(str);
        parse(str);
        input = [];
      } else if (key(ev) !== 'backspace') {
        input.push(String.fromCharCode(ev.which || ev.keyCode));
      }
    },

    keydown: (ev) => {
      if (key(ev) === 'backspace') {
        if (input.length > 0) {
          input.pop();
        } else {
          ev.preventDefault();
        }
      } else if (ignoreKey(ev.keyCode)) {
        ev.preventDefault();
      }
    },
  };
};

class Loader {
  constructor(target, loadingSymbol) {
    this._loading = false;
    this._target = target;
    this._count = 0;
    this._loadingSymbol = loadingSymbol || '.';

    this._startLoading = this._startLoading.bind(this);
    this._endLoading = this._endLoading.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this._clearLoading = this._clearLoading.bind(this);
    this._addDot = this._addDot.bind(this);
  }

  _clearLoading() {
    const value = this._target.value;
    this._target.value = value.substring(
      0,
      value.length - this._count * this._loadingSymbol.length,
    );
    this._count = 0;
  }

  _addDot() {
    this._target.value += this._loadingSymbol;
    this._count += 1;
  }

  isLoading() {
    return this._loading;
  }

  _startLoading() {
    if (this._loading) return;
    this._loading = true;

    const interval = setInterval(() => {
      if (!this._loading) {
        clearInterval(interval);
        return;
      }

      if (this._count >= 4) this._clearLoading();
      this._addDot();
    }, 1000);
  }

  _endLoading() {
    if (!this._loading) return;
    this._loading = false;

    if (this._count === 0) return;
    this._clearLoading();
  }

  setLoading(status) {
    if (status === true) {
      this._startLoading();
    } else {
      this._endLoading();
    }
  }
}

// Creates the terminal
export const terminal = (opts) => {
  let buffer = []; // What will be output to display
  let busy = false; // If we cannot type at the moment
  let isLocked = false; // Lock input

  const { prompt, banner, commands, buflen, tickrate, root, callback } = createOptions(opts);
  const $root = root;
  const $element = createElement($root);
  const fontSize = getFontSize($element);
  const width = $element.offsetWidth;
  const cwidth = Math.round((width / fontSize) * 1.9); // FIXME: Should be calculated via canvas

  const loader = new Loader($element);

  const output = (output, center) => {
    if (loader.isLoading()) loader.setLoading(false);

    let lines = output.split(/\n/);
    if (center) {
      lines = lines.map((line) =>
        line.length > 0 ? line.padStart(line.length + (cwidth / 2 - line.length / 2), ' ') : line,
      );
    }

    const append = lines.join('\n') + '\n' + prompt();
    buffer = buffer.concat(append.split(''));
  };

  const print = printer($element, buflen);
  const execute = executor(commands);
  const onrender = () => (busy = print(buffer));
  const onparsed = (cmd, ...args) => execute(cmd, ...args)(output);
  const render = renderer(tickrate, onrender);
  const parse = parser(onparsed);
  const focus = () => setTimeout(() => $element.focus(), 1);
  const kbd = keyboard(parse, callback);
  const clear = () => ($element.value = '');
  const input = (ev) => (busy || isLocked ? ev.preventDefault() : kbd[ev.type](ev));
  const inputLock = (lock) => (isLocked = Boolean(lock));

  $element.addEventListener('focus', () => setSelectionRange($element));
  $element.addEventListener('blur', focus);
  $element.addEventListener('keypress', input);
  $element.addEventListener('keydown', input);
  window.addEventListener('focus', focus);
  $root.addEventListener('click', focus);
  $root.appendChild($element);

  render();
  output(banner, false);
  focus();

  const destroy = () => {
    $element.removeEventListener('focus', () => setSelectionRange($element));
    $element.removeEventListener('blur', focus);
    $element.removeEventListener('keypress', input);
    $element.removeEventListener('keydown', input);
    window.removeEventListener('focus', focus);
    $root.removeEventListener('click', focus);
    $root.innerHtml = '';
  };

  return {
    focus,
    parse,
    clear,
    print: output,
    destroy,
    inputLock,
    setLoading: loader.setLoading,
  };
};
