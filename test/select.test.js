import { expect } from '@esm-bundle/chai';
import { fixture, html, nextFrame } from '@open-wc/testing-helpers';
import { render } from 'lit-html';
import { keyDownOn } from '@polymer/iron-test-helpers/mock-interactions.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import './mock-item.js';
import '../vaadin-select.js';
import './not-animated-styles.js';

function arrowUp(target) {
  keyDownOn(target, 38, [], 'ArrowUp');
}

function arrowDown(target) {
  keyDownOn(target, 40, [], 'ArrowDown');
}

function space(target) {
  MockInteractions.keyDownOn(target, 32, [], ' ');
}

function enter(target) {
  MockInteractions.keyDownOn(target, 13, [], 'Enter');
}

function esc(target) {
  MockInteractions.keyDownOn(target, 27, [], 'Escape');
}

describe('vaadin-select', () => {
  let select, input;

  describe('empty', () => {
    let select;

    beforeEach(async () => {
      select = await fixture(html`<vaadin-select></vaadin-select>`);
    });

    it('should not throw an exception if renderer is not set', () => {
      select.opened = true;
      select.value = 'foo';
      select.opened = false;
    });

    it('should not throw an exception if renderer does not create list-box', () => {
      select.renderer = (root) => {
        root.appendChild(document.createElement('div'));
      };
      select.opened = true;
      select.value = 'foo';
      select.opened = false;
    });

    it('should assign menu element if renderer was set after DOM is ready', () => {
      const renderer = (root) => {
        if (root.firstElementChild) {
          return;
        }
        const menu = document.createElement('vaadin-list-box');
        const item = document.createElement('vaadin-item');
        menu.appendChild(item);
        root.appendChild(menu);
      };
      select.renderer = renderer;
      expect(select._menuElement).to.not.be.undefined;
    });
  });

  describe('with items', () => {
    beforeEach(async () => {
      select = await fixture(html`<vaadin-select></vaadin-select>`);
      select.renderer = (root) => {
        if (root.firstElementChild) {
          return;
        }
        render(
          html`
            <vaadin-list-box>
              <mock-item>Option 1</mock-item>
              <mock-item value="v2" label="o2">Option 2</mock-item>
              <mock-item value="">Option 3</mock-item>
              <mock-item></mock-item>
              <mock-item label="">Empty</mock-item>
              <mock-item value="v4" disabled>Disabled</mock-item>
            </vaadin-list-box>
          `,
          root
        );
      };
      input = select._inputElement;
    });

    describe('selection', () => {
      let menu;

      beforeEach(async () => {
        select.opened = true;
        menu = select._menuElement;
        await nextFrame();
      });

      it('should select the first item with an empty value by default', () => {
        expect(menu.selected).to.be.equal(2);
      });

      it('should close the overlay when selecting a new item', () => {
        menu.selected = 1;
        expect(select._overlayElement.opened).to.be.false;
      });

      it('should update selection slot with a clone of the selected item', () => {
        menu.selected = 2;
        const itemElement = select._items[menu.selected];
        const valueElement = select._valueElement.firstChild;
        expect(valueElement).not.to.be.equal(itemElement);
        expect(valueElement.localName).to.be.equal(itemElement.localName);
        expect(valueElement.textContent).to.be.equal(itemElement.textContent);
      });

      it('should preserve the selected attribute when selecting the disabled item', () => {
        menu.selected = 5;
        const valueElement = select._valueElement.firstChild;
        expect(valueElement.selected).to.be.true;
        expect(valueElement.disabled).to.be.true;
      });

      it('should not update value if the selected item does not have a value', () => {
        menu.selected = 2;
        expect(select.value).to.be.empty;
      });

      it('should update value with the value of the selected item', () => {
        menu.selected = 1;
        expect(select.value).to.be.equal('v2');
      });

      it('should set empty value if an item without `value` is selected', () => {
        menu.selected = 1;
        menu.selected = 3;
        expect(select.value).to.be.empty;
      });

      it('should remove tabindex when cloning the selected element', () => {
        menu.selected = 2;
        const itemElement = select._items[menu.selected];
        const valueElement = select._valueElement.firstChild;
        expect(itemElement.tabIndex).to.be.equal(0);
        expect(valueElement.hasAttribute('tabindex')).to.be.false;
      });

      it('should remove role when cloning the selected element', () => {
        menu.selected = 2;
        const itemElement = select._items[menu.selected];
        const valueElement = select._valueElement.firstChild;
        expect(itemElement.tabIndex).to.be.equal(0);
        expect(valueElement.hasAttribute('role')).to.be.false;
      });

      it('should update selection slot textContent with the selected item `label` string', () => {
        menu.selected = 1;
        expect(select._valueElement.textContent.trim()).to.be.equal('o2');
      });

      it('should wrap the selected item `label` string in selected vaadin item', () => {
        menu.selected = 1;
        const item = select._valueElement.firstElementChild;
        expect(item.localName).to.equal('vaadin-item');
        expect(item.textContent).to.equal('o2');
        expect(item.selected).to.be.true;
        expect(item.getAttribute('tabindex')).to.be.null;
      });

      it('should update selection slot when value is provided', () => {
        select.value = 'v2';
        expect(select._valueElement.textContent.trim()).to.be.equal('o2');
      });

      it('should update overlay selected item when value is provided', () => {
        select.value = 'v2';
        expect(menu.selected).to.be.equal(1);
      });

      it('should not select any item when value is not found in items', () => {
        select.value = 'v2';
        select.value = 'foo';
        expect(menu.selected).to.be.undefined;
      });
    });

    describe('opening the overlay', () => {
      it('should keep synchronized opened properties in overlay and select', () => {
        select.opened = true;
        expect(select.opened).to.be.true;
        expect(select._overlayElement.opened).to.be.true;

        select.opened = false;
        expect(select._overlayElement.opened).to.be.false;
        expect(select.opened).to.be.false;
      });

      it('should restore attribute focus-ring if it was initially set before opening', () => {
        select.setAttribute('focus-ring', '');
        select.opened = true;
        select.opened = false;
        expect(select.focusElement.hasAttribute('focus-ring')).to.be.true;
      });

      it('should open overlay on click event on input field', () => {
        expect(select._overlayElement.opened).to.be.false;
        input.focusElement.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true, composed: true }));
        expect(select._overlayElement.opened).to.be.true;
      });

      it('should open overlay on click event on toggle button', () => {
        expect(select._overlayElement.opened).to.be.false;
        select._toggleElement.click();
        expect(select._overlayElement.opened).to.be.true;
      });

      it('should open overlay on ArrowUp', () => {
        arrowUp(input);
        expect(select._overlayElement.opened).to.be.true;
      });

      it('should open overlay on Down', () => {
        arrowDown(input);
        expect(select._overlayElement.opened).to.be.true;
      });

      it('should open overlay on Space', () => {
        space(input);
        expect(select._overlayElement.opened).to.be.true;
      });

      it('should open overlay on Enter', () => {
        enter(input);
        expect(select._overlayElement.opened).to.be.true;
      });

      it('should close overlay on Escape', () => {
        select.opened = true;
        esc(input);
        expect(select._overlayElement.opened).to.be.false;
      });

      // TODO: investigate
      it.skip('should align the overlay on top left corner by default on input click', () => {
        enter(input);
        const overlayRect = select._overlayElement.getBoundingClientRect();
        const inputRect = input.shadowRoot.querySelector('[part~="input-field"]').getBoundingClientRect();
        expect(overlayRect.top).to.be.equal(inputRect.top);
        expect(inputRect.left).to.be.equal(inputRect.left);
      });

      it('should store the text-field width in the custom CSS property on overlay opening', () => {
        input.style.width = '200px';
        select.opened = true;
        const prop = '--vaadin-select-text-field-width';
        const value = getComputedStyle(select._overlayElement).getPropertyValue(prop);
        expect(value).to.be.equal(input.getBoundingClientRect().width + 'px');
      });
    });

    describe('has-value attribute on text-field', () => {
      it('should not be set by default', () => {
        expect(select._inputElement.getAttribute('has-value')).to.be.null;
      });

      it('should set when value is set to not empty', () => {
        select.value = 'v2';
        expect(select._inputElement.getAttribute('has-value')).to.equal('');
      });

      it('should remove when value is set to empty', () => {
        select.value = 'v2';
        select.value = '';
        expect(select._inputElement.getAttribute('has-value')).to.be.null;
      });
    });

    describe('disabled', () => {
      it('should disable the input and disable opening if select is disabled', () => {
        select.disabled = true;
        expect(input.disabled).to.be.true;

        enter(input);
        expect(select._overlayElement.opened).to.be.false;

        input.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(select._overlayElement.opened).to.be.false;
      });
    });

    describe('readonly', () => {
      it('should disable opening if select is readonly', () => {
        select.readonly = true;
        enter(input);
        expect(select._overlayElement.opened).to.be.false;

        input.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(select._overlayElement.opened).to.be.false;
      });
    });
  });

  describe('with value', () => {
    let menu;

    beforeEach(async () => {
      select = await fixture(html`<vaadin-select value="v2"></vaadin-select>`);
      select.renderer = (root) => {
        if (root.firstElementChild) {
          return;
        }
        render(
          html`
            <vaadin-list-box>
              <mock-item value="v1">t1</mock-item>
              <mock-item value="v2" label="o2">t2</mock-item>
            </vaadin-list-box>
          `,
          root
        );
      };
      menu = select._menuElement;
    });

    it('should be possible to set value declaratively', () => {
      expect(menu.selected).to.be.equal(1);
      expect(select._valueElement.textContent.trim()).to.be.equal('o2');
    });
  });

  describe('with theme attribute', () => {
    let select;

    beforeEach(async () => {
      select = await fixture(html`<vaadin-select theme="foo"></vaadin-select>`);
    });

    it('should propagate theme attribute to field', () => {
      expect(select._inputElement.getAttribute('theme')).to.equal('foo');
    });

    it('should propagate theme attribute to overlay', () => {
      expect(select._overlayElement.getAttribute('theme')).to.equal('foo');
    });
  });

  describe('inside flexbox', () => {
    let container;

    beforeEach(async () => {
      container = await fixture(
        html`<div style="display: flex; flex-direction: column; width: 500px;">
          <vaadin-select></vaadin-select>
        </div>`
      );
    });

    it('should stretch inside a column flex container', () => {
      const select = container.querySelector('vaadin-select');
      expect(window.getComputedStyle(container).width).to.eql('500px');
      expect(parseFloat(window.getComputedStyle(select).width)).to.eql(500);
    });
  });
});
