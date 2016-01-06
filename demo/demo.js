import CEd from '../src/index';

function setup () {
  let ced = new CEd();
  ced.init();
}
document.addEventListener('DOMContentLoaded', function () {
  setup();
});
