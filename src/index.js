import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

export default class CEd {
  constructor (options) {
    if (!options) options = {};
    if (!options.container) options.container = document.getElementsByTagName('textarea')[0];
    this.container = options.container;
  }

  init () {
    this.editor = CodeMirror.fromTextArea(this.container, {
      lineNumbers: true
    });
    this.editor.on('changes', function () {
      console.log(this.content);
    }.bind(this));
  }

  set content (block) {
    let el = document.createElement('div');
    el.innerHTML = block.html;
    this.editor.setValue(el.textContent);
  }

  get content () {
    return this.editor.getValue();
  }
};
