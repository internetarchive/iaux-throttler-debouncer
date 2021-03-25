import { html, css, LitElement, property, customElement } from 'lit-element';

import { Debouncer } from '../src/debouncer';
import { Throttler } from '../src/throttler';

@customElement('app-root')
export class AppRoot extends LitElement {
  private debouncer = new Debouncer(this.__incrementDebounce, 500, this);

  private throttler = new Throttler(this.__incrementThrottle, 1000, this);

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--your-webcomponent-text-color, #000);
    }
  `;

  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) debounceCounter = 5;

  @property({ type: Number }) throttleCounter = 5;

  __incrementDebounce() {
    this.debounceCounter += 1;
  }

  __incrementThrottle() {
    this.throttleCounter += 1;
  }

  userClickedDebounce() {
    this.debouncer.execute();
  }

  userClickedThrottle() {
    this.throttler.execute();
  }

  render() {
    return html`
      <h2>${this.title}, Number debounced: ${this.debounceCounter}!</h2>
      <button @click=${this.userClickedDebounce}>increment</button>

      <h2>${this.title}, Number throttled: ${this.throttleCounter}!</h2>
      <button @click=${this.userClickedThrottle}>increment</button>
    `;
  }
}
