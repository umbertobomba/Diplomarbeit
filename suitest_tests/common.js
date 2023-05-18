const suitest = require('suitest-js-api');
const {assert, VRC, PROP} = suitest;

const interval = 1500;
const sleep = 1500;

module.exports = {
    generalSleep: sleep,
    generalInterval: interval,

    async openService() {
        await suitest.openApp();
        await suitest.assert.location().equals('https://hbb.swisstxt.ch/app.html#/');
        await assert.press(VRC.RED).interval(interval);
    },

    async openHelpPage() {
        await assert.press([VRC.UP, VRC.RIGHT, VRC.ENTER]).interval(interval);
    },

    async compareUrlChangeWhenNavigatingArticles() {
        // store location URL with the id of the article
        const actualLocation = await suitest.location();
        
        // Switch to next article
        await suitest.press(VRC.ENTER);
        await suitest.sleep(sleep);

        // After opening a new article the url should change for the id of the new article
        await suitest.assert.location().isNot().equal(actualLocation);

        // Navigate to the previous articel navigation item and press Enter
        await suitest.press([VRC.LEFT, VRC.ENTER]).interval(interval);
        await suitest.sleep(sleep);

        // Aftergoing back to the first article the URL should again match
        await suitest.assert.location().contains(actualLocation);
    },

    // If an error occurs with the data we display the message "Keine Informationen vorhanden"
    // Not to be confused with the message "Keine aktuellen Spiele"
    // Both elements check if the structure for an error exist and if so they check for the text inside the element
    // Configured in the suitest UI under the elements tab
    async handleNoErrorMessageOnScreen() { 
        await assert.element('subNavContainer').exists();
        await assert.element('noInformationsHandler01').doesNot().exist();
        await assert.element('noInformationsHandler02').doesNot().exist();
    },

    async navigateTo(destination) {
        await assert.press(VRC.RIGHT).until(
            suitest.element('topNav_navigationItem').matches({
                [PROP.TEXT_CONTENT]: destination,
            })
        ).repeat(25).interval(interval);
        await suitest.sleep(sleep);
        await assert.press(VRC.ENTER).interval(interval);
        await suitest.sleep(sleep);
    }
}