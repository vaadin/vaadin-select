import { SelectElement } from './vaadin-select';

/**
 * Function for rendering the content of the `<vaadin-select>`.
 * Receives two arguments:
 *
 * - `root` The `<vaadin-select-overlay>` internal container
 *   DOM element. Append your content to it.
 * - `select` The reference to the `<vaadin-select>` element.
 */
export type SelectRenderer = (root: HTMLElement, select?: SelectElement) => void;

/**
 * Fired when the `opened` property changes.
 */
export type SelectOpenedChanged = CustomEvent<{ value: boolean; path: 'opened' }>;

/**
 * Fired when the `invalid` property changes.
 */
export type SelectInvalidChanged = CustomEvent<{ value: boolean; path: 'invalid' }>;

/**
 * Fired when the `value` property changes.
 */
export type SelectValueChanged = CustomEvent<{ value: string; path: 'value' }>;

export interface SelectElementEventMap {
  'opened-changed': SelectOpenedChanged;

  'invalid-changed': SelectInvalidChanged;

  'value-changed': SelectValueChanged;
}

export interface SelectEventMap extends HTMLElementEventMap, SelectElementEventMap {}
