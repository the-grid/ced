import * as CodeMirror from 'codemirror';
import {encodeHTML,decodeHTML} from 'entities';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

export default class CEd {
  constructor (options) {
    if (!options) options = {};
    if (!options.container) options.container = document.getElementsByTagName('textarea')[0];
    this.container = options.container;
    this.block = null;
    this.onchanged = function () {};
  }

  init () {
    this.editor = CodeMirror.fromTextArea(this.container, {
      lineNumbers: true
    });
    this.editor.on('changes', function () {
      let html = this.prepareHTML(this.editor.getValue());
      if (html === this.block.html) return;
      this.onchanged(this.content);
    }.bind(this));
  }

  prepareHTML (code) {
    return '<pre>' + encodeHTML(code) + '</pre>';
  }

  set content (block) {
    this.block = block;
    let el = document.createElement('div');
    el.innerHTML = this.block.html;
    this.editor.setValue(decodeHTML(el.textContent));
  }

  get content () {
    this.block.text = this.editor.getValue();
    this.block.html = this.prepareHTML(this.block.text);
    return this.block;
  }
};
