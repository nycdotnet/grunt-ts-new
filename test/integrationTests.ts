import "grunt";

export function test_FruitScriptsSrc(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>, grunt: IGrunt) {
  if (ctx.filesSrc.length !== 2) {
    throw "Expected two files with the specified src.";
  }
  return true;
}


export function test_FruitScriptsFiles(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>, grunt: IGrunt) {
  if (ctx.filesSrc.length !== 2) {
    throw "Expected two files with the specified files object.";
  }
  return true;
}
