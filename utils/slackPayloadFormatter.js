const formatter = (device, failedTests, stats ) => {
    let currentTestSuite = '';
    const payload = {
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "🎉 New Testrun finished 🎉",
                    "emoji": true
			    }
		    },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Device:*\n${device}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Results:*\n${stats.passes}/${stats.tests} passed`
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Failed Tests:*"
                }
            },
        ]
    }

    failedTests.map(test => {
        if(test.suite != currentTestSuite) {
            currentTestSuite = test.suite;
            payload.blocks.push({
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `Testsuite: ${currentTestSuite}`
                    }
                ]
            })
        }

        const message = stringCleaner(test.error);
        payload.blocks.push({
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*${test.testName}*\n:exclamation:${message}`
			}
		})
    })
    
    return payload
}

const stringCleaner = (error) => {
    let cleanedError = error
        .replace('\x1B[31m', '')
        .replace('✖ \u001b[0m', '')
        .replace('\u001b[32m', '')
        .replace('\u001b[0m', '')
        .replace('\u001b[4m', '')
        .replace('\u001b[0m\n  \u001b[31m', '')
        .replace('\u001b[0m', '')

    let position = cleanedError.search("fail")
    return cleanedError.slice(0, position) + '\n:exclamation:' + cleanedError.slice(position)
}

exports.formatter = formatter