/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import '@polymer/polymer/lib/elements/dom-module.js';

import { OverlayElement } from '@vaadin/vaadin-overlay/src/vaadin-overlay.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="vaadin-select-overlay-styles" theme-for="vaadin-select-overlay">
  <template>
    <style>
      :host {
        align-items: flex-start;
        justify-content: flex-start;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
  * The overlay element.
  *
  * ### Styling
  *
  * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/src/vaadin-overlay.html)
  * for `<vaadin-select-overlay>` parts.
  *
  * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
  *
  * @extends PolymerElement
  */
class SelectOverlayElement extends OverlayElement {
  static get is() {
    return 'vaadin-select-overlay';
  }
}
customElements.define(SelectOverlayElement.is, SelectOverlayElement);
