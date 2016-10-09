import * as integrationTests from './test/integrationTests';

const gruntTsConfig : {[index: string] : IGruntTsGruntfileConfiguration} = {
  test_Integration_CompileTheFruitScripts: {
    options: {
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
  }
};

const gruntFunction = function (grunt: IGrunt) {
  grunt.initConfig({
    ts : gruntTsConfig
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['ts']);
};

export = gruntFunction;
