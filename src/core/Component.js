export default class Component {
  $target;
  $state;

  constructor ($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup () {};

  template () { return ''; }

  render () {
    this.$target.innerHTML = this.template();
  }

  setEvent () {}

  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const children = [ ...this.$target.querySelectorAll(selector)];
    // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을땐 closest를 이요하여 처리
    const isTarget = (target) => children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, event => {
      if(!isTarget(event.target)) return false;
      callback(event);
    })
  }
}