'use strict';

const Mocha = require('mocha');
const { devices } = require('./devices');
const { formatter } = require('./slackPayloadFormatter')
const request = require('sync-request');
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
} = Mocha.Runner.constants;

class MyReporter {
  constructor(runner, options) {
    let currentTestSuite = '';
    const failedTests = []
    const stats = runner.stats;
    this.options = options.reporterOptions

    runner
      .once(EVENT_RUN_BEGIN, () => {
        console.log('\nTestreporter Start');
      })
      .on(EVENT_SUITE_BEGIN, (event) => {
        if(event.title != '' && event.title != currentTestSuite) {
          console.log('\nRunning Testsuite =>' ,event.title, '\n')
          currentTestSuite = event.title;
        }
      })
      .on(EVENT_TEST_PASS, test => {
        console.log(`\n✔ ${test.fullTitle()}\n`);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(`\n❌ ${test.fullTitle()}\n`);
        failedTests.push({
          suite: currentTestSuite,
          testName: test.fullTitle(),
          error: err.message
        })
      })
      .once(EVENT_RUN_END, (event) => {
        console.log('\n\nTestrun finished on device', devices[options['device']])
        console.log(`Result: ${stats.passes}/${stats.passes + stats.failures} ok\n`)
        console.log('\x1b[31mFailed tests: \x1b[0m')
        
        failedTests.map(failedTest => {
          console.log('\n', failedTest.testName)
          console.log(failedTest.error, '\n')
        })

        let newMessage = formatter(devices[options['device']], failedTests, stats)
        if(options.webhook == undefined) return
        
        request(
          'POST', 
          `${options.webhook}`, 
          {
            json: newMessage, 
          }
        )
      }
    );
  }
}

module.exports = MyReporter;