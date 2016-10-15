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
