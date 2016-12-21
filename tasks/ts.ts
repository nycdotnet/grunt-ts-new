import * as optionsResolver from "./modules/optionsResolver";

if (!Promise) {
  const bluebird = require("bluebird");
  Promise = bluebird;
}

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
  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', async function (this: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
    const gruntDone = this.async();

    if (this.data.options && this.data.options.__integrationTestFunction) {
      return gruntDone(processIntegrationTest(this, grunt));
    }

    try {
      await runGruntTsAsync(this);
      gruntDone();
    } catch(error) {
      grunt.log.error(`failed with error: ${error}`);
      gruntDone(false);
    }
  });
}

async function runGruntTsAsync(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
  let resultingTsConfigObject = optionsResolver.convertGruntTsContextToTsConfig(ctx);
}

export = gruntPlugin;
