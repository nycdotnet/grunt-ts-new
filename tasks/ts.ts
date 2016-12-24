import * as optionsResolver from "./modules/optionsResolver";
import * as tsconfigEmitter from "./modules/tsconfigEmitter";
import * as bluebird from "bluebird";

Promise = bluebird;

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

function gruntUtilSpawnAsync(grunt: IGrunt, options: grunt.util.ISpawnOptions): Promise<{error: Error, result: grunt.util.ISpawnResult, code: number}> {
  return new Promise((resolve, reject) => {
    const child = grunt.util.spawn(options, (error, result, code) => {
      resolve({error, result, code});
    });
  });
}

async function gruntPlugin(grunt: IGrunt) {

  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', async function (this: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
    const gruntDone = this.async();

    if (this.data.options && this.data.options.__integrationTestFunction) {
      return gruntDone(processIntegrationTest(this, grunt));
    }

    try {
      await runGruntTsAsync(grunt, this);
      gruntDone();
    } catch(error) {
      gruntDone(grunt.util.error(`failed with error: ${error}`, error));
    }
  });
}

async function runGruntTsAsync(grunt: IGrunt, ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
  
  const sharedTsConfigObject = await optionsResolver.convertGruntTsContextToTsConfigAsync(ctx);

  for (let filesIndex = 0; filesIndex < ctx.files.length; filesIndex += 1) {
    const compilationSpecificTsConfig = optionsResolver.addFiles(sharedTsConfigObject, ctx.files[filesIndex].src || []);
    const temporaryTsConfigJsonFileName = await tsconfigEmitter.emitTemporaryTsconfigJsonAsync(compilationSpecificTsConfig, ctx);

    try {
      const tscArgs = ["node_modules/typescript/lib/tsc.js", "-p", temporaryTsConfigJsonFileName];

      const executionResult = await gruntUtilSpawnAsync(grunt, {cmd: process.execPath, args: tscArgs});
      console.log(executionResult.result.stdout);
      console.log(`TypeScript Exit Code: ${executionResult.code}`);
      // code 0 = OK, 1 = errors detected - no emit, 2 = errors detected - emitted anyway

    } catch(error) {
      console.log("Error: " + JSON.stringify(error));
    }
  }


}

export = gruntPlugin;
