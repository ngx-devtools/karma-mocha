const path = require('path')

const typescript2 =  require('rollup-plugin-typescript2')
const nodeResolve = require('rollup-plugin-node-resolve')
const istanbul = require('rollup-plugin-istanbul')

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
        nodeResolve(),
        istanbul({
          exclude: [
            "src/**/*.spec.ts",
            "node_modules/**/*"
          ]
        })
      ],
      output: {
        format: "iife", 
        sourcemap: 'inline'
      }
    },

    coverageIstanbulReporter: {
      reports: [ 'lcov', 'text-summary' ],
      dir: 'coverage',
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        }
      }
    },
  
    browsers: ['ChromeHeadlessNoSandbox'],
  
    reporters: ['progress', 'coverage-istanbul'],
  
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
