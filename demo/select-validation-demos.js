import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class SelectValidationDemos extends DemoReadyEventEmitter(SelectDemo(PolymerElement)) {
  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>
    <h3>Required</h3>
    <vaadin-demo-snippet id="select-required" when-defined="vaadin-select">
      <template preserve-content="">
        <vaadin-select label="Required" required="" error-message="Please choose one option">
          <template>
            <vaadin-list-box>
              <vaadin-item></vaadin-item>
              <hr>
              <vaadin-item>Option one</vaadin-item>
              <vaadin-item>Option two</vaadin-item>
              <vaadin-item>Option three</vaadin-item>
            </vaadin-list-box>
          </template>
        </vaadin-select>
      </template>
    </vaadin-demo-snippet>
`;
  }

  static get is() {
    return 'select-validation-demos';
  }
}
customElements.define(SelectValidationDemos.is, SelectValidationDemos);
