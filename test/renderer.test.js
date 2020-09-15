import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { fixture, html, nextFrame } from '@open-wc/testing-helpers';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import './mock-item.js';
import '../vaadin-select.js';

describe('vaadin-select accessibility', () => {
  let select;
  let rendererContent;

  function generateRendererWithItems(items) {
    return function (root, select) {
      if (root.firstChild) {
        root.firstChild.items &&
          root.firstChild.items.forEach((item, index) => (item.textContent = items[index] + (select.__testVar || '')));
        return;
      }

      const listBox = window.document.createElement('vaadin-list-box');
      items.forEach((text) => {
        const item = window.document.createElement('vaadin-item');
        item.textContent = text + (select.__testVar || '');
        item.value = text;
        listBox.appendChild(item);
      });
      root.appendChild(listBox);
    };
  }

  beforeEach(async () => {
    select = await fixture(html`<vaadin-select></vaadin-select>`);
    rendererContent = document.createElement('vaadin-list-box');
    const rendererItem = document.createElement('mock-item');
    rendererItem.textContent = 'renderer item';
    rendererContent.appendChild(rendererItem);
  });

  it('should use renderer when it is defined', () => {
    select.renderer = (root) => root.appendChild(rendererContent);
    expect(select.shadowRoot.querySelector('vaadin-list-box mock-item').textContent.trim()).to.equal('renderer item');
  });

  it('should pass vaadin-select as owner to vaadin-overlay', () => {
    select.renderer = (root, owner) => {
      expect(owner).to.eql(select);
    };
  });

  it('should be possible to manually invoke renderer', () => {
    const spy = (select.renderer = sinon.spy());
    select.opened = true;
    spy.resetHistory();
    select.render();
    expect(spy.callCount).to.equal(1);
  });

  it('should update selected value after renderer is called', async () => {
    select.renderer = generateRendererWithItems(['foo', 'bar']);
    await nextFrame();
    select.value = 'bar';
    select.__testVar = 'baz';
    select.render();
    await nextFrame();
    expect(select._menuElement.selected).to.be.equal(1);
    expect(select._valueElement.textContent.trim()).to.be.equal('barbaz');
  });

  it('should update selected value after renderer is reassigned based on the value', async () => {
    select.renderer = generateRendererWithItems(['foo', 'bar']);
    await nextFrame();
    select.value = 'bar';
    select.renderer = generateRendererWithItems(['bar', 'foo']);
    await nextFrame();
    expect(select.value).to.equal('bar');
    expect(select._menuElement.selected).to.equal(0);
  });
});
