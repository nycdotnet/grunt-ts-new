import * as nodeunit from 'nodeunit';
import * as or from '../tasks/modules/optionsResolver';

export const tests : nodeunit.ITestGroup = {
  "Options Resolver tests": {
    "Passed-in parameters come out as expected": (test: nodeunit.Test) => {
      test.expect(48);

      var sut = or.convertGruntTsContextToTsConfig(<any>{
          data: <IGruntTsGruntfileConfiguration>{
            options: {
                additionalTsConfigOptions: {
                    foo: "bar",
                    compilerOptions: {
                        bas: "qux"
                    }
                },
                allowJs: true,
                allowSyntheticDefaultImports: true,
                allowUnreachableCode: false,
                allowUnusedLabels: true,
                comments: false,
                compile: false,
                compiler: "somecompiler.js",
                declaration: false,
                emitBOM: true,
                emitDecoratorMetadata: true,
                emitGruntEvents: true,
                experimentalAsyncFunctions: false,
                experimentalDecorators: true,
                failOnTypeErrors: false,
                forceConsistentCasingInFileNames: true,
                inlineSourceMap: true,
                inlineSources: true,
                isolatedModules: true,
                jsx: "preserve",
                locale: "ja-jp",
                mapRoot: ".",
                module: "umd",
                moduleResolution: "node",
                newLine: "LF",
                noEmit: false,
                noEmitHelpers: false,
                noEmitOnError: false,
                noFallthroughCasesInSwitch: true,
                noImplicitAny: true,
                noImplicitReturns: true,
                noImplicitUseStrict: false,
                noLib: false,
                noResolve: true,
                preserveConstEnums: true,
                pretty: true,
                reactNamespace: "REEACTTTTT",
                removeComments: true,
                rootDir: "someRootDir",
                skipDefaultLibCheck: false,
                sourceMap: false,
                sourceRoot: "theSourceRoot",
                stripInternal: false,
                suppressExcessPropertyErrors: false,
                suppressImplicitAnyIndexErrors: false,
                target: "es3",
                verbose: true
            }
          }
      });
      if (sut == undefined || sut.compilerOptions == undefined || sut.gruntTsExtensions == undefined) {
          throw "unexpected undefined result.";
      }

      test.strictEqual(sut.compilerOptions.allowJs, true, "allowJs");
      test.strictEqual(sut.compilerOptions.allowSyntheticDefaultImports, true, "allowSyntheticDefaultImports");
      test.strictEqual(sut.compilerOptions.allowUnreachableCode, false, "allowUnreachableCode");
      test.strictEqual(sut.compilerOptions.allowUnusedLabels, true, "allowUnusedLabels");
      test.strictEqual(sut.compilerOptions.removeComments, true, "comments (via removeComments)");
      test.strictEqual(sut.compilerOptions.declaration, false, "declaration");
      test.strictEqual(sut.compilerOptions.emitBOM, true, "emitBOM");
      test.strictEqual(sut.compilerOptions.emitDecoratorMetadata, true, "emitDecoratorMetadata");
      test.strictEqual(sut.compilerOptions.experimentalAsyncFunctions, false, "experimentalAsyncFunctions");
      test.strictEqual(sut.compilerOptions.experimentalDecorators, true, "experimentalDecorators");
      test.strictEqual(sut.compilerOptions.forceConsistentCasingInFileNames, true, "forceConsistentCasingInFileNames");
      test.strictEqual(sut.compilerOptions.inlineSourceMap, true, "inlineSourceMap");
      test.strictEqual(sut.compilerOptions.inlineSources, true, "inlineSources");
      test.strictEqual(sut.compilerOptions.isolatedModules, true, "isolatedModules");
      test.strictEqual(sut.compilerOptions.jsx, "preserve", "jsx");
      test.strictEqual(sut.compilerOptions.locale, "ja-jp", "locale");
      test.strictEqual(sut.compilerOptions.mapRoot, ".", "mapRoot");
      test.strictEqual(sut.compilerOptions.module, "umd", "module");
      test.strictEqual(sut.compilerOptions.moduleResolution, "node", "moduleResolution");
      test.strictEqual(sut.compilerOptions.newLine, "LF", "newLine");
      test.strictEqual(sut.compilerOptions.noEmit, false, "noEmit");
      test.strictEqual(sut.compilerOptions.noEmitHelpers, false, "noEmitHelpers");
      test.strictEqual(sut.compilerOptions.noFallthroughCasesInSwitch, true, "noFallthroughCasesInSwitch");
      test.strictEqual(sut.compilerOptions.noImplicitAny, true, "noImplicitAny");
      test.strictEqual(sut.compilerOptions.noImplicitReturns, true, "noImplicitReturns");
      test.strictEqual(sut.compilerOptions.noImplicitUseStrict, false, "noImplicitUseStrict");
      test.strictEqual(sut.compilerOptions.noLib, false, "noLib");
      test.strictEqual(sut.compilerOptions.noEmitOnError, false, "noEmitOnError");
      test.strictEqual(sut.compilerOptions.noResolve, true, "noResolve");
      test.strictEqual(sut.compilerOptions.preserveConstEnums, true, "preserveConstEnums");
      test.strictEqual(sut.compilerOptions.pretty, true, "pretty");
      test.strictEqual(sut.compilerOptions.reactNamespace, "REEACTTTTT", "reactNamespace");
      test.strictEqual(sut.compilerOptions.removeComments, true, "removeComments");
      test.strictEqual(sut.compilerOptions.rootDir, "someRootDir", "rootDir");
      test.strictEqual(sut.compilerOptions.skipDefaultLibCheck, false, "skipDefaultLibCheck");
      test.strictEqual(sut.compilerOptions.sourceMap, false, "sourceMap");
      test.strictEqual(sut.compilerOptions.sourceRoot, "theSourceRoot", "sourceRoot");
      test.strictEqual(sut.compilerOptions.stripInternal, false, "stripInternal");
      test.strictEqual(sut.compilerOptions.suppressExcessPropertyErrors, false, "suppressExcessPropertyErrors");
      test.strictEqual(sut.compilerOptions.suppressImplicitAnyIndexErrors, false, "suppressImplicitAnyIndexErrors");
      test.strictEqual(sut.compilerOptions.target, "es3", "target");

      test.strictEqual(sut.gruntTsExtensions.compile, false, "compile");
      test.strictEqual(sut.gruntTsExtensions.compiler, "somecompiler.js", "compiler");
      test.strictEqual(sut.gruntTsExtensions.emitGruntEvents, true, "emitGruntEvents");
      test.strictEqual(sut.gruntTsExtensions.failOnTypeErrors, false, "failOnTypeErrors");
      test.strictEqual(sut.gruntTsExtensions.verbose, true, "verbose");


      test.strictEqual((<any>sut).foo, "bar", "additionalTsConfigOptions (foo)");
      test.strictEqual((<any>sut.compilerOptions).bas, "qux", "additionalTsConfigOptions (compilerOptions.bas)");

      test.done();
    }
  }
}
