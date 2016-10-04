import CEd from '../src/index'

function setup () {
  let ced = new CEd()
  ced.init()
  return ced
}

function send (topic, id, payload) {
  window.parent.postMessage({
    topic: topic,
    id: id,
    payload: payload
  }, '*')
}

document.addEventListener('DOMContentLoaded', function () {
  let ced = setup()

  let lastHeight = 0
  function checkHeight () {
    let height = ced.editor.getScrollInfo().height + 40
    if (height !== lastHeight) {
      send('height', ced.id, height)
      lastHeight = height
    }
  }
  // Send initial height
  checkHeight()

  ced.onchanged = function (block) {
    send('changed', ced.id, block)
    checkHeight()
  }
  window.addEventListener('message', function (message) {
    switch (message.data.topic) {
      case 'setblock':
        ced.content = message.data.payload
        break
      case 'getblock':
        send('setblock', ced.content)
        break
      case 'focus':
        ced.editor.focus()
        break
    }
  })
})
