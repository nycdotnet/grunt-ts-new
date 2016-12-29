/** This documents the valid and supported items in tsconfig.json "root" object.
 * see http://json.schemastore.org/tsconfig
 * also: https://www.typescriptlang.org/docs/handbook/compiler-options.html
 */
interface ITSConfigJsonFile {
    compilerOptions?: ITsConfigJsonCompilerOptions;
    files?: string[];
    exclude?: string[];
    include?: string[];
    filesGlob?: string[];
    gruntTsExtensions?: IGruntTsExtensions;
}

interface IGruntTsExtensions {
    compile: boolean;
    compiler: string;
    emitGruntEventInsteadOfFailing: boolean;
    failOnTypeErrors: boolean;
    verbose: boolean;
}

/** This documents the valid and supported items in tsconfig.json compilerOptions object.
 * originally sourced from atom-typescript
 * see http://json.schemastore.org/tsconfig
 * also: https://www.typescriptlang.org/docs/handbook/compiler-options.html
 */
interface ITsConfigJsonCompilerOptions {
    allowJs?: boolean;
    allowSyntheticDefaultImports?: boolean;
    allowUnreachableCode?: boolean;
    allowUnusedLabels?:boolean;
    baseUrl?: string;
    /** character set of the input files. */
    charset?: string;
    declaration?: boolean;
    declarationDir?: boolean;
    diagnostics?: boolean;
    disableSizeLimit?: boolean;
    emitBOM?: boolean;
    emitDecoratorMetadata?: boolean;
    experimentalAsyncFunctions?: boolean;
    experimentalDecorators?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    //help?: boolean; //NOT SUPPORTED IN TSCONFIG.JSON
    isolatedModules?: boolean;
    //init?: void; //NOT SUPPORTED IN TSCONFIG.JSON
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    jsx?: string;
    lib?: string[];
    listEmittedFiles?: boolean;
    listFiles?: boolean;
    locale?: string;
    mapRoot?: string;
    maxNodeModuleJsDepth?: number;
    module?: string;
    moduleResolution?: string;
    newLine?: string;
    noEmit?: boolean;
    noEmitHelpers?: boolean;
    noEmitOnError?: boolean;
    noErrorTruncation?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noImplicitAny?: boolean;
    noImplicitReturns?: boolean;
    noImplicitThis?: boolean;
    noImplicitUseStrict?: boolean;
    noLib?: boolean;
    noLibCheck?: boolean;
    noResolve?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    out?: string;  //DEPRECATED
    outFile?: string;
    outDir?: string;
    paths?: Object;
    preserveConstEnums?: boolean;
    pretty?: boolean;
    //project?: string;  //NOT SUPPORTED IN TSCONFIG.JSON
    reactNamespace?: string;
    removeComments?: boolean;
    rootDir?: string;
    rootDirs?: string[];
    skipLibCheck?: boolean;
    skipDefaultLibCheck?: boolean;
    sourceMap?: boolean;
    sourceRoot?: string;
    strictNullChecks?: boolean;
    stripInternal?: boolean;
    suppressExcessPropertyErrors?: boolean;
    suppressImplicitAnyIndexErrors?: boolean;
    target?: string;
    traceResolution?: boolean;
    types?: string[];
    typeRoots?: string[];
    //version?: boolean; //NOT SUPPORTED IN TSCONFIG.JSON
    //watch?: boolean; //NOT SUPPORTED IN TSCONFIG.JSON
}
