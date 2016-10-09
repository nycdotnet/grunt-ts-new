/** This interface contains all of the options supported by grunt-ts
 *  See https://www.typescriptlang.org/docs/handbook/compiler-options.html for the latest info */
interface IGruntTsGruntfileConfiguration {
  options : IGruntTsGruntfileConfigurationOptions
}

/** This interface contains all of the options supported by grunt-ts 'options' object
 *  See https://www.typescriptlang.org/docs/handbook/compiler-options.html for the latest info */
interface IGruntTsGruntfileConfigurationOptions {
    declaration?: boolean;
    emitDecoratorMetadata?: boolean;
    experimentalDecorators?: boolean;
    mapRoot?: string;
    module?: "commonjs" | "amd" | "umd" | "system" | "es6" | "es2015" | "none" | "";
    noImplicitAny?: boolean;
    noResolve?: boolean;
    /** false to remove comments */
    comments?: boolean;
    /** true to remove comments */
    removeComments?: boolean;
    sourceMap?: boolean;
    sourceRoot?: string;
    target?: string;
    failOnTypeErrors?: boolean;
    /** If a type error occurs, do not emit the JavaScript.  New in TypeScript 1.4.  */
    noEmitOnError?: boolean;
    /** Const enums will be kept as enums in the emitted JS. If false, the enum values will
     * look like magic numbers with a comment in the emitted JS. */
    preserveConstEnums?: boolean;
    /** Allows access to properties of an object by string indexer when --noImplicitAny is
     * active, even if TypeScript doesn't know about them. */
    suppressImplicitAnyIndexErrors?: boolean;
    verbose?: boolean;
    compile?: boolean;
    compiler?: string; // If you want, the path to a custom TypeScript compiler's main JS file
    noEmit?: boolean;
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    /** Specifies the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix). */
    newLine?: string;
    /** Makes cases that break single-file transpilation an error. */
    isolatedModules?: boolean;
    /** If true, will not generate custom helper functions like  __extends in compiled output. */
    noEmitHelpers?: boolean;
    /** Represents an object to merge with the root tsconfig.json object */
    additionalTsConfigOptions?: Object;
    /** Specify JSX code generation style: 'preserve' or 'react' */
    jsx?: string;
    /** Specifies module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    moduleResolution?: string;
    /** Enables experimental support for ES7 async functions */
    experimentalAsyncFunctions?: string;
    /** Sepecifies the root directory of input files.  Use to control the output directory structure with --outDir. */
    rootDir?: string;
    /** grunt-ts setting to emit events in Grunt */
    emitGruntEvents?: boolean;
    /** noLib - do not auto-include the lib.d.ts file in the compilation context */
    noLib?: boolean;
    /** emitBOM - indicates if emitted files should include a Byte Order Mark */
    emitBOM?: boolean;
    /** locale - pass a culture string like "en" or "ja-jp" for locale-specific error messages (requires error file in same folder as tsc) */
    locale?: string;
    /** Disables strict object literal assignment checking */
    suppressExcessPropertyErrors?: boolean;
    /** Does not emit objects marked as internal */
    stripInternal?: boolean;
    /** Assumes a defalt export as the whole module if one is not specified, or as the only export if only one export is specified */
    allowSyntheticDefaultImports?: boolean;
    /** Specifies the object invoked for createElement and __spread when targeting 'react' JSX emit. */
    reactNamespace?: string;
    /** Treat a file as a default lib if it has '/// <reference no-default-lib="true"/> at the top */
    skipDefaultLibCheck?: boolean;
    /** Stylize errors and messages using color and context. */
    pretty?: boolean;
    /** Do not report errors on unused labels. */
    allowUnusedLabels?: boolean;
    /** Report error when not all code paths in function return a value. */
    noImplicitReturns?: boolean;
    /** Report errors for fallthrough cases in switch statement. */
    noFallthroughCasesInSwitch?: boolean;
    /** Do not report errors on unreachable code. */
    allowUnreachableCode?: boolean;
    /** Disallow inconsistently-cased references to the same file. */
    forceConsistentCasingInFileNames?: boolean;
    /** Allow JavaScript files to be compiled. */
    allowJs?: boolean;
    /** Do not emit  "use strict"  directives in module output. */
    noImplicitUseStrict?: boolean;
}
