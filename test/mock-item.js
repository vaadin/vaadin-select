import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MockItemElement extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
`;
  }

  static get is() {
    return 'mock-item';
  }

  static get properties() {
    return {
      _hasVaadinItemMixin: {
        type: Boolean,
        value: true
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged'
      },
      _value: String,
      selected: {
        type: Boolean
      }
    };
  }

  ready() {
    super.ready();

    const attrValue = this.getAttribute('value');
    if (attrValue !== null) {
      this.value = attrValue;
    }

    this.addEventListener('keydown', e => this._onKeydown(e));
    this.addEventListener('keyup', e => this._onKeyup(e));
  }

  get value() {
    return this._value !== undefined ? this._value : this.textContent.trim();
  }

  set value(value) {
    this._value = value;
  }

  _disabledChanged(disabled) {
    if (disabled) {
      this.selected = false;
    }
  }

  _setActive(active) {
    if (active) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  _onKeydown(event) {
    if (/^( |SpaceBar|Enter)$/.test(event.key) && !event.defaultPrevented) {
      event.preventDefault();
      this._setActive(true);
    }
  }

  _onKeyup(event) {
    if (this.hasAttribute('active')) {
      this._setActive(false);
      this.click();
    }
  }
}

customElements.define(MockItemElement.is, MockItemElement);
