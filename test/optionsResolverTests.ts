import * as nodeunit from 'nodeunit';
import * as or from '../tasks/modules/optionsResolver';

export const tests : nodeunit.ITestGroup = {
  "Any tests": {
    "Passed-in parameters come out as expected": (test: nodeunit.Test) => {
      test.expect(23);

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
                compile: true,
                compiler: "somecompiler.js",
                declaration: false,
                emitBOM: true,
                emitDecoratorMetadata: true,
                emitGruntEvents: true,
                experimentalAsyncFunctions: false,
                experimentalDecorators: true,
                forceConsistentCasingInFileNames: true,
                inlineSourceMap: true,
                inlineSources: true,
                isolatedModules: true,
                jsx: "preserve",
                locale: "ja-jp",
                failOnTypeErrors: false,
                sourceMap: false,
                noImplicitAny: true,
                noEmitOnError: false,
            }
          }
      });

      test.strictEqual(sut!.compilerOptions!.allowJs, true, "allowJs");
      test.strictEqual(sut!.compilerOptions!.allowSyntheticDefaultImports, true, "allowSyntheticDefaultImports");
      test.strictEqual(sut!.compilerOptions!.allowUnreachableCode, false, "allowUnreachableCode");
      test.strictEqual(sut!.compilerOptions!.allowUnusedLabels, true, "allowUnusedLabels");
      test.strictEqual(sut!.compilerOptions!.removeComments, true, "comments (via removeComments)");
      test.strictEqual(sut!.gruntTsExtensions!.compile, true, "compile");
      test.strictEqual(sut!.gruntTsExtensions!.compiler, "somecompiler.js", "compiler");
      test.strictEqual(sut!.compilerOptions!.declaration, false, "declaration");
      test.strictEqual(sut!.compilerOptions!.emitBOM, true, "emitBOM");
      test.strictEqual(sut!.compilerOptions!.emitDecoratorMetadata, true, "emitDecoratorMetadata");
      test.strictEqual(sut!.gruntTsExtensions!.emitGruntEvents, true, "emitGruntEvents");
      test.strictEqual(sut!.compilerOptions!.experimentalAsyncFunctions, false, "experimentalAsyncFunctions");
      test.strictEqual(sut!.compilerOptions!.experimentalDecorators, true, "experimentalDecorators");
      test.strictEqual(sut!.compilerOptions!.forceConsistentCasingInFileNames, true, "forceConsistentCasingInFileNames");
      test.strictEqual(sut!.compilerOptions!.inlineSourceMap, true, "inlineSourceMap");
      test.strictEqual(sut!.compilerOptions!.inlineSources, true, "inlineSources");
      test.strictEqual(sut!.compilerOptions!.isolatedModules, true, "isolatedModules");
      test.strictEqual(sut!.compilerOptions!.jsx, "preserve", "jsx");
      test.strictEqual(sut!.compilerOptions!.locale, "ja-jp", "locale");
      test.strictEqual(sut!.gruntTsExtensions!.failOnTypeErrors, false, "failOnTypeErrors");
      test.strictEqual(sut!.compilerOptions!.sourceMap, false, "sourceMap");
      test.strictEqual(sut!.compilerOptions!.noImplicitAny, true, "noImplicitAny");
      test.strictEqual(sut!.compilerOptions!.noEmitOnError, false, "noEmitOnError");
      test.done();
    }
  }
}
