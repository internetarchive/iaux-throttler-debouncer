/**
 * Executes a function no more than once within the specified time threshhold
 */

export class Throttler {
  private callback: () => void;

  private threshhold: number;

  private context: any;

  private last?: number;

  private deferTimeout?: number;

  /**
   *
   * @param callback
   * @param threshhold - in milliseconds
   * @param context - will be bound to callback as its "this" value
   *
   */
  constructor(
    callback: () => void,
    threshhold = 250,
    context: any = undefined
  ) {
    this.callback = callback;
    this.threshhold = threshhold;
    this.context = context;
    this.last = undefined;
    this.deferTimeout = undefined;
  }

  execute() {
    const now = +new Date();

    if (this.last && now < this.last + this.threshhold) {
      clearTimeout(this.deferTimeout);
      this.deferTimeout = window.setTimeout(
        this.executeCallback.bind(this),
        this.threshhold
      );
    } else {
      this.executeCallback.call(this);
    }
  }

  private executeCallback() {
    this.last = +new Date();
    this.callback.apply(this.context);
  }
}
