# DA_suitestAPITests

## Beginner's Guide

### Configuration Setup

1. In the projekt root folder create a configuration file
````
touch .suitestrc
````
2. Add the configuration to the .suitestrc file
````
{
    "tokenId"           : "****",
    "tokenPassword"     : "****",
    "appConfigId"       : "****",
    "deviceId"          : "****"
}
````
3. Replace the placeholder text with your ID's from the [suitest](https://the.suite.st/login) webportal
- Click on the top menu on the right hand side and go to Preferences/API Tokens
- Click on the + icon and create a new token
- Replace the value of "tokenId" and "tokenPassword"
- Select your application on the left hand side
- Click on "Settings" in the top middle of the screen
- Switch to the "JavaScript API" tab and replace "appConfigId" with the one displayed
- Go to the device menu on the right hand side and click on "see all devices"
- Click the three dots on the right side of your device and choose "Show device details"
- Replace the value of "deviceId" in your config file with the device ID you see on the bottom of the device information modal
4. Run the tests with the following script:
````
npm run regression
````
After a few you should see the tests run on your device

----
</br>

### Configure multiple devices

1. In the projekt root folder create a configuration file
````
touch .suitestrc.base.json
````
2. Add the configuration to the .suitestrc.base.json file
````
{
    "tokenId"           : "****",
    "tokenPassword"     : "****"
}
````
3. Add or remove devices to one of the three .suitestrc.parallel.*.json files
4. Run the tests with the following script and choose your environment
````
regression:parallel:dev
regression:parallel:int
regression:parallel:prod
````
- You do not need the "appConfigId" to configure unless you want to test on another environment that dev, int or prod.
- If you want to run tests on multiple devices on a special environment please create a new .suitestrc.parallel.*.json file with your prevered environemnt.

----
</br>

### Create a new test
1. Open the file suitest_tests/regressionTests.js
2. Create a new test inside a describe() testsuite with the follwing boilerplate:
````
it('should...', async () => {
    // your testing code here
})
````
3. If you need a new testsuite just add a new describe() block with the following boilerplate:
````
describe.only('Open pages from index', () => {
 // your tests here   
})
````
4. If it makes sense to create a new testfile, create the new one in the folder suitest_tests
5. Be sure to checkout the testsfile regressionTests.js for Suitest specific imports
6. Copy an existing script to start a test inside the package.json file and replace or add the path to your new testfile at the end of the script
 ----
</br>

### DRY - common.js
1. Don't repeat yourself
2. As soon as se note that a sequence of teststeps are repeated in more than two of your tests create a new function inside common.js and import and use it in your tests.
 ----
</br>

### The navigation function
If you browse thru the test you will shortly notice a navigateTo() function. 
You can use this function to navigate to a specific navigation item in the nop navigation of the application. Just enter the text of the navigation item you want to go. The example below navigates to the meteo app form the index.
````
await navigateTo('Meteo');
````
Please be aware that this functions just works with the current top navigation you are in. As example if you want to navigate to the "Inland" tab inside the "News" App you need to pass two layers. First you have to navigate to the "News" app, then press ENTER and then you can navigate to the "Inland" tab. As example:
````
await navigateTo('News');
await suitest.press(VRC.ENTER);
await navigateTo('Inland');
````
Maybe it could also be a good idea to add the first navigaten function inside the beforeEach hook. Maybe your test should all start in the "News" app then you would configure the testsuite like this:
````
describe('My news testsuite', () => {
    beforeEach(async() => {
        await openService();
        await navigateTo('News');
    })

    it('should start from news app', async () => {
        // your testing code here
    })

})

````
 ----
</br>

### Further documentation

- For answers about the suitest API visit the official [suitest docs](https://suite.st/docs/)
- For answers about mocha.js as a testrunner visit the official [mocha website](https://mochajs.org/)
- If you have an urgent issue and noone in your team can help you contact the official suitest support.



 






