import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing-helpers';
import { render } from 'lit-html';
import { keyDownOn } from '@polymer/iron-test-helpers/mock-interactions.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import '../vaadin-select.js';

function getFirstMenuItem(menu) {
  return menu._overlayElement.content.querySelector('vaadin-item');
}

function space(target) {
  keyDownOn(target, 32, [], ' ');
}

function afterAnimation(el) {
  const name = getComputedStyle(el).getPropertyValue('animation-name');
  return new Promise((resolve) => {
    if (name && name != 'none') {
      const listener = () => {
        el.removeEventListener('animationend', listener);
        resolve();
      };
      el.addEventListener('animationend', listener);
    } else {
      resolve();
    }
  });
}

describe('vaadin-select accessibility', () => {
  let select, input;

  beforeEach(async () => {
    select = await fixture(html`<vaadin-select label="Label"></vaadin-select>`);
    select.renderer = (root) => {
      if (root.firstElementChild) {
        return;
      }
      render(
        html`
          <vaadin-list-box>
            <vaadin-item>Option 1</vaadin-item>
            <vaadin-item>Option 2</vaadin-item>
            <vaadin-item>Option 3</vaadin-item>
          </vaadin-list-box>
        `,
        root
      );
    };
    input = select._inputElement;
  });

  it('should not fail when quick toggling with mouse because of animations', async () => {
    input.click();
    getFirstMenuItem(select).click();
    input.click();
    getFirstMenuItem(select).click();
    await afterAnimation(select._overlayElement);
    expect(select._overlayElement.opened).to.be.false;
  });

  it('should not fail when quick toggling with keyboard because of animations', async () => {
    space(input);
    space(getFirstMenuItem(select));
    space(input);
    await afterAnimation(select._overlayElement);
    expect(document.activeElement).to.equal(getFirstMenuItem(select));
  });
});
