/* eslint-disable max-classes-per-file */

import { expect } from '@open-wc/testing';
import Sinon from 'sinon';
import { Debouncer } from '../src/debouncer';

describe('Debouncer', () => {
  it('can debounce calls', done => {
    const callback = Sinon.spy();

    const debouncer = new Debouncer(callback, 10);

    // execute 5 times in a row, but we should only see 1 call to `callback`, the last one
    debouncer.execute();
    debouncer.execute();
    debouncer.execute();
    debouncer.execute();
    debouncer.execute();

    setTimeout(() => {
      expect(callback.callCount).to.equal(1);
      done();
    }, 100);
  });

  it('can make subsequent debounce calls', done => {
    const callback = Sinon.spy();

    const debouncer = new Debouncer(callback, 10);

    // execute 2 in a row, only 1 will fire (the second one),
    // then 25ms later, execute another one, which should also fire after 35ms
    debouncer.execute();
    debouncer.execute();

    setTimeout(() => {
      debouncer.execute();
    }, 50);

    setTimeout(() => {
      expect(callback.callCount).to.equal(2);
      done();
    }, 100);
  });

  it('does not call before timeout time', done => {
    const callback = Sinon.spy();

    const debouncer = new Debouncer(callback, 10);

    debouncer.execute();

    setTimeout(() => {
      expect(callback.callCount).to.equal(0);
    }, 5);

    setTimeout(() => {
      expect(callback.callCount).to.equal(1);
      done();
    }, 100);
  });

  it('context is undefined when not passed in', done => {
    class MockObject {
      debouncer: Debouncer = new Debouncer(this.testCallback, 10);

      startThrottle() {
        this.debouncer.execute();
      }

      testCallback() {
        expect(this).to.equal(undefined);
        done();
      }
    }

    const mockObj = new MockObject();
    mockObj.startThrottle();
  });

  it('can maintain proper call context', done => {
    class MockObject {
      debouncer = new Debouncer(this.testCallback, 10, this);

      startThrottle() {
        this.debouncer.execute();
      }

      testCallback() {
        expect(this).not.to.equal(undefined);
        done();
      }
    }

    const mockObj = new MockObject();
    mockObj.startThrottle();
  });
});
