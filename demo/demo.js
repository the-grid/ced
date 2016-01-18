document.addEventListener('DOMContentLoaded', function () {
  let iframe = document.getElementById('demo').contentWindow;
  // Sending content to the editor
  iframe.addEventListener('load', function () {
    iframe.postMessage({
      topic: 'setblock',
      payload: {
        type: 'code',
        metadata: {
          programmingLanguage: 'text/javascript'
        },
        id: 'd4be36b0-d18e-438c-8564-9ae79963b5e4',
        html: '<pre>let foo = \'bar\';\n&lt;blink&gt;Hello&lt;/blink&gt;</pre>'
      }
    }, '*');
  });
  // Receiving content from the editor
  window.addEventListener('message', function (message) {
    let iframe = document.getElementById('demo');
    let preview = document.getElementById('preview');

    switch (message.data.topic) {
      case 'changed':
        preview.innerHTML = message.data.payload.html
        let previewLang = document.getElementById('preview_language')
        previewLang.innerHTML = message.data.payload.metadata.programmingLanguage
        break
      case 'height':
        iframe.height = message.data.payload
      default:
        break
    }
  });
});
