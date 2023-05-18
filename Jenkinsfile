pipeline {
    agent any
    triggers {
        cron('00 02 * * 7')
    }
    environment {
        SUITEST_TOKEN = credentials('suitest-token')
        SUITEST_TOKEN_PW = credentials('suitest-token-pw')
        SUITEST_APP_CONFIG = credentials('suitest-app-config')
        SUITEST_DEVICE_ID = credentials('suitest-device-id')
        SUITEST_SLACK_WEBHOOK = credentials('suitest-slack-webhook')
    }
    stages {
        stage('Install') {
            when {
                expression {
                    BRANCH_NAME == 'main'
                }
            }
            steps {
                echo 'Building stage'
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            when {
                expression {
                    BRANCH_NAME == 'main'
                }
            }
            steps {
                echo 'Testing stage'
                sh "npx suitest-js-api run --token-id=${SUITEST_TOKEN} --token-password=${SUITEST_TOKEN_PW} --app-config-id=${SUITEST_APP_CONFIG} --device-id=${SUITEST_DEVICE_ID} mocha --reporter=./utils/slackTestReporter.js --device=${SUITEST_DEVICE_ID} --webhook=${SUITEST_SLACK_WEBHOOK} --no-timeouts --exit \'./suitest_tests/regressionTests.js\'"
            }
        }
    }
}

