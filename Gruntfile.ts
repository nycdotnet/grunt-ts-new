import * as integrationTests from './test/integrationTests';

const gruntTsConfig : {[index: string] : IGruntTsGruntfileConfiguration} = {
  test_Integration_CompileTheFruitScripts: {
    options: {
      target: "es5",
      noImplicitAny: true
    },
    src: ["artifacts/FruitScripts/**/*.ts"]
  },
  test_Integration_FailOnTypeErrors: {
    options: {
      target: "es5",
      noImplicitAny: true,
      failOnTypeErrors: true,
      noEmitOnError: true,
      emitGruntEventInsteadOfFailing: true,
      expectThisTaskWillFail: true
    },
    src: ["artifacts/TypeErrors/**/*.ts"]
  },
  test_Integration_FailOnSyntaxErrors: {
    options: {
      target: "es5",
      noImplicitAny: true,
      failOnTypeErrors: true,
      emitGruntEventInsteadOfFailing: true,
      expectThisTaskWillFail: true
    },
    src: ["artifacts/CompileErrors/**/*.ts"]
  },
  test_Integration_DoNotFailOnTypeErrors: {
    options: {
      target: "es5",
      noImplicitAny: true,
      failOnTypeErrors: false,
      expectThisTaskWillFail: false
    },
    src: ["artifacts/TypeErrors/**/*.ts"]
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
    },
    clean: {
      default: [
        "*.tmp.json"
      ]
    }
  });

  integrationTests.failureAnalysis.initialize(grunt);

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['ts', 'validate_failure_count', 'nodeunit', 'clean']);
  
};

export = gruntFunction;
