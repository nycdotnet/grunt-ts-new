import * as optionsResolver from "./modules/optionsResolver";
import * as tsconfigEmitter from "./modules/tsconfigEmitter";
import * as bluebird from "bluebird";

Promise = bluebird;

let spawnAsync: (options: {cmd: string, args: string[]}) => {stdout: string, stderr: string, code: number};

const processIntegrationTest = (ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>, grunt: IGrunt) : false | undefined => {
  try {
      const testResult = ctx.data.options!.__integrationTestFunction!(ctx, grunt);
      if (testResult) {
        return undefined;
      }
  } catch (ex) {
      grunt.log.error(ex);
      grunt.log.writeln(JSON.stringify(ctx,null,2));
      return false;
  }
    grunt.log.error(`${ctx.target ? "Test attached to " + ctx.target : "Current test"} failed, but did not throw exception.`);
    grunt.log.writeln(JSON.stringify(ctx,null,2));
    return false;
}

async function gruntPlugin(grunt: IGrunt) {
  spawnAsync = <any>bluebird.promisify(grunt.util.spawn);

  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', async function (this: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
    const gruntDone = this.async();

    if (this.data.options && this.data.options.__integrationTestFunction) {
      return gruntDone(processIntegrationTest(this, grunt));
    }

    try {
      await runGruntTsAsync(this);
      gruntDone();
    } catch(error) {
      gruntDone(grunt.util.error(`failed with error: ${error}`, error));
    }
  });
}

async function runGruntTsAsync(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
  
  const resultingTsConfigObject = await optionsResolver.convertGruntTsContextToTsConfigAsync(ctx);
  const temporaryTsConfigJsonFileName = await tsconfigEmitter.emitTemporaryTsconfigJsonAsync(resultingTsConfigObject, ctx);
  var runResult;
  try {
    const tscArgs = ["node_modules/typescript/lib/tsc.js", "-p", temporaryTsConfigJsonFileName];
    console.log("tsc args: " + JSON.stringify(tscArgs));
    runResult = await spawnAsync({cmd: process.execPath, args: tscArgs});
  } catch(error) {
    console.log("Error" + JSON.stringify(error));
  }
  console.log(JSON.stringify(runResult));
  //const result = await tsconfigEmitter.deleteAsync(temporaryTsConfigJsonFileName);
}

export = gruntPlugin;
