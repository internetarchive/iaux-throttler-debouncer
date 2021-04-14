/**
 * Wait until some time has passed before executing a callback.
 */
export class Debouncer {
  private callback: () => void;

  private threshhold: number;

  private context: any;

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
    this.deferTimeout = undefined;
  }

  /**
   * Call debouncer function
   */
  execute() {
    clearTimeout(this.deferTimeout);
    this.deferTimeout = window.setTimeout(
      this.executeCallback.bind(this),
      this.threshhold
    );
  }

  private executeCallback() {
    this.callback.apply(this.context);
  }
}
