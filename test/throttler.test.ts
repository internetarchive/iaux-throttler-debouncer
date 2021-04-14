/* eslint-disable max-classes-per-file */

import { expect } from '@open-wc/testing';
import Sinon from 'sinon';
import { Throttler } from '../src/throttler';

describe('Throttler', () => {
  it('can throttle calls', done => {
    const callback = Sinon.spy();

    const throttler = new Throttler(callback, 10);

    // execute 5 times in a row, but we should only see 2 calls to `callback`, the first and last
    throttler.execute();
    throttler.execute();
    throttler.execute();
    throttler.execute();
    throttler.execute();

    setTimeout(() => {
      expect(callback.callCount).to.equal(2);
      done();
    }, 75);
  });

  it('context is undefined when not passed in', done => {
    class MockObject {
      throttler = new Throttler(this.testCallback, 25);

      startThrottle() {
        this.throttler.execute();
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
      throttler = new Throttler(this.testCallback, 25, this);

      startThrottle() {
        this.throttler.execute();
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
