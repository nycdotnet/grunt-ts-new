import "grunt";

// The tests in this file are called from the Gruntfile via the __integrationTestFunction
//  property on the target `options` object

export function test_FruitScriptsSrc(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>, grunt: IGrunt) {
  AssertStrictEqual(1, ctx.files.length, "There should be one element of files.");
  AssertStrictEqual(2, ctx.files[0]!.src!.length, "The FruitScripts directory has two matching files.");
  return true;
}

export function test_FruitScriptsFiles(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>, grunt: IGrunt) {
  AssertStrictEqual(1, ctx.files.length, "There should be one element of files.");
  AssertStrictEqual(2, ctx.files[0]!.src!.length, "The FruitScripts directory has two matching files.");
  return true;
}

export function test_TwoFiles(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>, grunt: IGrunt) {
  AssertStrictEqual(2, ctx.files.length, "There should be two elements of files.");
  AssertStrictEqual(2, ctx.files[0]!.src!.length, "The FruitScripts directory has two matching files.");
  AssertStrictEqual(3, ctx.files[1]!.src!.length, "The FishScripts directory has three matching files.");
  return true;
}

function AssertStrictEqual<T>(expected: T, actual: T, message?: string) {
  if (expected === actual) {
    return;
  }
  if (message == undefined) {
    throw `Expected ${expected}, but got ${actual} instead.`;
  }
  throw `${message} (got ${actual}).`;
}

export namespace failureAnalysis {
  let totalFailures = 0;
  let tasksExpectedToFail: string[] = [];
  export function initialize(grunt: IGrunt) {
    grunt.event.on('grunt-ts.failure', () => totalFailures += 1);

    setupFailTasks(grunt.config.get('ts') as any);

    grunt.registerTask('validate_failure_count', 'Counts failure events emitted by grunt-ts', () => {
        grunt.log.writeln(`Expected ${tasksExpectedToFail.length} task failures and got ${totalFailures} failures.`);
        if (tasksExpectedToFail.length === 0) {
            grunt.log.error('Should have more than zero expected failures.');
            return false;
        }
        return (totalFailures === tasksExpectedToFail.length);
    });
  }

  function setupFailTasks(tasks: {[index: string]: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>}) {
    for (let taskName in tasks) {
      if ((tasks[taskName].options as IGruntTsGruntfileConfigurationOptions).expectThisTaskWillFail) {
        tasksExpectedToFail.push(taskName);
      }
    }
  }
}