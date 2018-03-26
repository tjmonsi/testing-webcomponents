/**
 * # test-component
 * `<test-component>` Test component
 *
 * @customElement
 *
 */

class TestComponent extends window.HTMLElement {
  static get is () { return 'test-component'; }

  testMethod () {
    console.log('test');
  }
}

if (!window.customElements.get(TestComponent.is)) {
  window.customElements.define(TestComponent.is, TestComponent);
} else {
  console.warn(`${TestComponent.is} is already defined somewhere. Please check your code.`);
}
