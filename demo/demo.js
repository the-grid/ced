import CEd from '../src/index';

function setup () {
  let ced = new CEd();
  ced.init();
  return ced;
}
document.addEventListener('DOMContentLoaded', function () {
  let ced = setup();

  ced.content = {
    type: 'code',
    id: 'd4be36b0-d18e-438c-8564-9ae79963b5e4',
    html: '<pre>let foo = \'bar\';</pre>'
  };
});
