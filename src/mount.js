import CEd from '../src/index';

function setup () {
  let ced = new CEd();
  ced.init();
  return ced;
}

function send (topic, payload) {
  window.parent.postMessage({
    topic: topic,
    payload: payload
  }, '*');
}

document.addEventListener('DOMContentLoaded', function () {
  let ced = setup();
  ced.onchanged = function (block) {
    send('changed', block);
  };
  window.addEventListener('message', function (message) {
    switch (message.data.topic) {
      case 'setblock':
        ced.content = message.data.payload;
        break;
      case 'getblock':
        send('setblock', ced.content);
        break;
    }
  });
});
