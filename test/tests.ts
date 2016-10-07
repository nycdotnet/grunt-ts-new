import * as nodeunit from 'nodeunit';

export const tests : nodeunit.ITestGroup = {
  "All tests": {
    "runs at all": (test: nodeunit.Test) => {
      test.expect(1);
      test.strictEqual(1, 1);
      test.done();
    }
  }
}
