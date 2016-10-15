import * as integrationTests from './test/integrationTests';
import {execSync} from 'child_process';

const gruntTsConfig : {[index: string] : IGruntTsGruntfileConfiguration} = {
  test_Integration_CompileTheFruitScripts: {
    options: {
      target: "es5",
      noImplicitAny: true
    },
    src: ["artifacts/FruitScripts/**/*.ts"]
  },
  test_FruitScriptsSrc: {
    options: {
      __integrationTestFunction : integrationTests.test_FruitScriptsSrc
    },
    src: ["artifacts/FruitScripts/**/*.ts"]
  },
  test_FruitScriptsFiles: {
    options: {
      __integrationTestFunction : integrationTests.test_FruitScriptsFiles
    },
    files: [{src: "artifacts/FruitScripts/**/*.ts"}]
  },
  test_TwoFiles: {
    options: {
      __integrationTestFunction : integrationTests.test_TwoFiles
    },
    files: [{src: "artifacts/FruitScripts/**/*.ts"},
          {src: "artifacts/FishScripts/**/*.ts"}]
  }
};

const gruntFunction = function (grunt: IGrunt) {
  grunt.initConfig({
    ts : gruntTsConfig,
    nodeunit: {
      fast: ["test/tests.js", "test/optionsResolverTests.js"]
    }
  });

  if (tryToBuildGruntTs(grunt)) {
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.registerTask('default', ['ts', 'nodeunit']);
  } else {
    
  }
};

/** Returns true if success.  If fail, prints error to Grunt and fails */
const tryToBuildGruntTs = function(grunt: IGrunt) {
  grunt.log.writeln("Building grunt-ts...");
  try {
    execSync("node node_modules/typescript/bin/tsc -p .");
    return true;
  } catch(ex) {
    if (ex.stdout && ex.stdout.toString) {
      grunt.log.writeln(ex.stdout.toString());
    }
    if (ex.stderr && ex.stderr.toString) {
      grunt.log.writeln(ex.stderr.toString());
    }
    grunt.fail.fatal(`Could not build grunt-ts.  Exit code was ${ex.status}`);
    
    //technically fatal should kill the process so this will never be reached.
    return false;
  }
}

export = gruntFunction;
