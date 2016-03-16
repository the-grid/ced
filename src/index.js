import {encode, decode} from 'he'
encode.options.useNamedReferences = true

import * as CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

// Modes needed for syntax highlighting
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/coffeescript/coffeescript'
import 'codemirror/mode/elm/elm'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/yaml/yaml'


export default class CEd {
  constructor (options) {
    if (!options) options = {}
    if (!options.container) options.container = document.getElementsByTagName('textarea')[0]
    if (!options.selector) options.selector = document.getElementsByTagName('select')[0]
    this.container = options.container
    this.selector = options.selector
    this.block = null
    this.onchanged = function () {}
  }

  init () {
    this.editor = CodeMirror.fromTextArea(this.container, {
      lineNumbers: true,
      viewportMargin: Infinity
    })
    this.editor.on('changes', function () {
      let html = this.prepareHTML(this.editor.getValue(), this.editor.getOption('mode'))
      if (html === this.block.html) return
      this.onchanged(this.content)
    }.bind(this))

    if (!this.selector) return

    this.selector.addEventListener('change', function () {
      this.mode = this.selector.value
      let html = this.prepareHTML(this.editor.getValue(), this.editor.getOption('mode'))
      if (html === this.block.html) return
      this.onchanged(this.content)
    }.bind(this))
    let modes = Object.keys(CodeMirror.mimeModes)
    for (var i=0; i<modes.length;i++) {
      let option = document.createElement('option')
      option.value = modes[i]
      option.textContent = modes[i]
      this.selector.appendChild(option)
    }
  }

  mimeToMode (mime) {
    let mode = CodeMirror.mimeModes[mime]
    if (!mode) return ''
    if (typeof mode === 'string') return 'language-' + mode
    return 'language-' + mode.name
  }

  prepareHTML (code, mime) {
    return '<pre><code class="' + this.mimeToMode(mime) + '">' + encode(code) + '</code></pre>'
  }

  set mode (mode) {
    this.editor.setOption('mode', mode)
    if (!this.block.metadata) this.block.metadata = {}
    this.block.metadata.programmingLanguage = mode
  }

  set content (block) {
    this.block = block
    this.id = block.id
    let el = document.createElement('div')
    el.innerHTML = this.block.html
    this.editor.setValue(el.textContent)
    if (this.block.metadata && this.block.metadata.programmingLanguage) {
      this.mode = this.block.metadata.programmingLanguage
      if (this.selector) this.selector.value = this.block.metadata.programmingLanguage
    }
  }

  get content () {
    this.block.text = this.editor.getValue()
    this.block.html = this.prepareHTML(this.block.text, this.editor.getOption('mode'))
    return this.block
  }
}
