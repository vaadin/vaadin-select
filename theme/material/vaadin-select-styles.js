import '@vaadin/vaadin-item/theme/material/vaadin-item.js';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box.js';
import '@vaadin/vaadin-text-field/theme/material/vaadin-text-field.js';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/font-icons.js';
import '@vaadin/vaadin-material-styles/mixins/menu-overlay.js';
import '@vaadin/vaadin-material-styles/mixins/field-button.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`<dom-module id="material-select" theme-for="vaadin-select">
  <template>
    <style include="material-field-button">
      :host {
        display: inline-flex;
        -webkit-tap-highlight-color: transparent;
      }

      [part="toggle-button"]::before {
        content: var(--material-icons-dropdown);
      }

      :host([opened]) [part="toggle-button"] {
        transform: rotate(180deg);
      }

      /* Disabled */

      :host([disabled]) {
        pointer-events: none;
      }
    </style>
  </template>
</dom-module><dom-module id="material-select-text-field" theme-for="vaadin-select-text-field">
  <template>
    <style>
      :host {
        width: 100%;
      }

      :host([disabled]) [part="input-field"],
      [part="input-field"],
      [part="value"] {
        cursor: default;
      }

      [part="input-field"]:focus {
        outline: none;
      }

      ::slotted([part="value"]) {
        display: flex;
      }
    </style>
  </template>
</dom-module><dom-module id="material-select-overlay" theme-for="vaadin-select-overlay">
  <template>
    <style include="material-menu-overlay">
      :host([bottom-aligned]) {
        justify-content: flex-end;
      }

      [part="overlay"] {
        min-width: var(--vaadin-select-text-field-width);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
