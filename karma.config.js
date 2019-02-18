const path = require('path')
const typescript2 =  require('rollup-plugin-typescript2')
const nodeResolve = require('rollup-plugin-node-resolve')

module.exports = function(config) {
  config.set({
    frameworks: [ 'mocha', 'chai' ],
  
    files: [
      { pattern: 'src/**/*.spec.ts' }
    ],

    preprocessors: {
      'src/**/*.spec.ts': [ 'rollup' ]
    },

    rollupPreprocessor: {
      plugins: [
        typescript2({
          tsconfigDefaults: { 
            compilerOptions: {
              "baseUrl": ".",
              "emitDecoratorMetadata": true,
              "experimentalDecorators": true,
              "target": "es2015", 
              "module": "es2015", 
              "moduleResolution": "node",           
              "lib": [ 
                "dom", 
                "es2015", 
                "es2017"  
              ]       
            },
            include: [ 'src/**/*.ts'  ]
          },
          check: false,
          cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
          useTsconfigDeclarationDir: true          
        }),
        nodeResolve()
      ],
      output: {
        format: "iife", 
        sourcemap: 'inline'
      }
    },
  
    browsers: ['ChromeHeadlessNoSandbox'],
  
    reporters: ['progress'],
  
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
  
    singleRun: true,
  
    concurrency: Infinity
  })
}
