import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

export default class CEd {
  constructor (options) {
    if (!options) options = {};
    if (!options.container) options.container = document.getElementsByTagName('textarea')[0];
    this.container = options.container;
    this.block = null;
  }

  init () {
    this.editor = CodeMirror.fromTextArea(this.container, {
      lineNumbers: true
    });
    this.editor.on('changes', function () {
      let html = this.prepareHTML();
      if (html === this.block.html) return;
      console.log(this.content);
    }.bind(this));
  }

  prepareHTML () {
    return '<pre>' + this.editor.getValue() + '</pre>';
  }

  set content (block) {
    this.block = block;
    let el = document.createElement('div');
    el.innerHTML = this.block.html;
    this.editor.setValue(el.textContent);
  }

  get content () {
    this.block.html = this.prepareHTML();
    return this.block;
  }
};
