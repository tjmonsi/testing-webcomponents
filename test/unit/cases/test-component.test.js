// @ts-nocheck
/* eslint-disable no-undef */
const sinon = window.sinon;

suite('TestComponent', () => {
  test('should have not be a HTMLUnknownElement constructor', () => {
    const el = document.querySelector('#test');
    expect(el.constructor.is).to.equal('test-component');
  });

  test('should have testMethod', () => {
    const el = document.createElement('test-component');
    document.body.appendChild(el);
    const method = 'testMethod';
    sinon.spy(el, method);
    el[method]();
    expect(el[method].calledOnce).to.be.true;
    document.body.removeChild(el);
  });
});
