/**
 * Created by OXOYO on 2017/10/25.
 */

const gulp = require('gulp')
const gulpEslint = require('gulp-eslint')
const gulpNodemon = require('gulp-nodemon')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')

const config = {
  server: {
    script: 'build/dev-server.js'
  }
}

const lintFiles = (files) => {
  return gulp.src(
    files
  ).pipe(
    gulpEslint({
      configFile: './.eslintrc.js'
    })
  ).pipe(
    gulpEslint.format(eslintFriendlyFormatter)
  ).pipe(
    gulpEslint.result(results => {
      // Called for each ESLint result.
      console.log(`ESLint result: ${results.filePath}`)
      if (results.messages.length) {
        console.log(`# Messages: ${results.messages.length}`)
      }
      if (results.warningCount) {
        console.log(`# Warnings: ${results.warningCount}`)
      }
      if (results.errorCount) {
        console.log(`# Errors: ${results.errorCount}`)
      }
    })
  ).pipe(
    gulpEslint.results(results => {
      // Called once for all ESLint results.
      console.log(`Total Results: ${results.length}`)
      if (results.messages) {
        console.log(`Total Messages: ${results.messages.length}`)
      }
      if (results.warningCount) {
        console.log(`Total Warnings: ${results.warningCount}`)
      }
      if (results.errorCount) {
        console.log(`Total Errors: ${results.errorCount}`)
      }
    })
  )
}

// eslint
gulp.task('ESlint', (done) => {
  lintFiles([
    'src/**',
    '!node_modules/**'
  ])
  done()
})

// nodemon
gulp.task('nodemon', (done) => {
  let stream = gulpNodemon({
    script: config.server.script,
    ext: 'js',
    env: {
      'NODE_ENV': process.env.NODE_ENV
    },
    tasks: (changedFiles) => {
      lintFiles(changedFiles)
      return []
    },
    done: done
  })
  stream.on('restart', () => {
    console.log('Service restarted!')
  }).on('crash', () => {
    console.error('Service has crashed!\n')
    // restart the server in 10 seconds
    // stream.emit('restart', 10)
  })
})

// default
gulp.task('default', () => {
  return gulp.series('ESlint', 'nodemon', (done) => {
    console.log('Service started!')
    done()
  })()
})
