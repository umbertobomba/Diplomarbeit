const { beforeEach } = require('mocha');
const suitest = require('suitest-js-api');
const {assert, VRC, PROP, COMP, VIDEO_STATE} = suitest;
const { openService, 
    openHelpPage, 
    navigateTo, 
    handleNoErrorMessageOnScreen, 
    compareUrlChangeWhenNavigatingArticles, 
    generalSleep, 
    generalInterval,
} = require('./common');

describe('Select the first video from the first swimlane in play', () => {
    beforeEach(async() => {
        await suitest.openUrl('https://hbb-dev.swisstxt.ch/app.html#/player/urn:srf:video:1c6d9ade-c23a-47e0-9f04-5bb5c988e5f7')
        await suitest.sleep(5000);
        await suitest.press(VRC.UP);
        // await suitest.sleep(generalSleep);
        // await suitest.press(VRC.OK);
    })


    it('should start the video', async () => {
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PLAYING
			},
			{
				name: PROP.VIDEO_POSITION,
				val: 5000,
				type: COMP.GREATER
			},
            // todo: → property missing
			// {
			// 	name: PROP.HEIGHT,
			// 	val: '720'
			// },
			// {
			// 	name: PROP.WIDTH,
			// 	val: '1280'
			// },
		]).timeout(10000);
    })

    it('should pause the video', async () => {
        await suitest.press([VRC.DOWN, VRC.OK]).interval(generalInterval);  
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PAUSED
			}
		]).timeout(2000);
    })

    it('should pause/play the video', async () => {
        await suitest.press([VRC.DOWN, VRC.OK]).interval(generalInterval);  
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PAUSED
			}
		]).timeout(2000);
        await suitest.press([VRC.DOWN, VRC.OK]).interval(generalInterval);  
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PLAYING
			}
		]).timeout(1000);
    })

    it('should forward/backward the video', async () => {
        await suitest.press([VRC.DOWN, VRC.RIGHT]).interval(generalInterval);
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PLAYING
			},
            {
				name: PROP.VIDEO_POSITION,
				val: 10000,
				type: COMP.LESSER
			}
		]).timeout(1000);
        await suitest.press(VRC.OK);
        await suitest.sleep(generalSleep);

        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PLAYING
			},
            {
				name: PROP.VIDEO_POSITION,
				val: 15000,
				type: COMP.GREATER
			}
		]).timeout(1000);
        // go to fast backwards
        await suitest.press([VRC.LEFT, VRC.LEFT, VRC.OK]).interval(generalInterval);
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PLAYING
			},
            {
				name: PROP.VIDEO_POSITION,
				val: 15000,
				type: COMP.LESSER
			}
		]).timeout(1000);
    })

    it('should display the information box, go to more videos and start a new one', async () => {
        await suitest.press([VRC.DOWN, VRC.RIGHT, VRC.RIGHT, VRC.OK]).interval(generalInterval);  
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PLAYING
			}
		]).timeout(1000);
        await assert.element('playerInfoBoxTitle').visible();
        // go to more videos
        await suitest.press([VRC.UP, VRC.OK]).interval(generalInterval);
        await suitest.sleep(generalSleep);
        // start an other video
        await suitest.press([VRC.UP, VRC.OK]).interval(generalInterval);
        await assert.video().matches([
			{
				name: PROP.VIDEO_STATE,
				val: VIDEO_STATE.PLAYING
			}
		]).timeout(3000);
    })

    // todo: do it after implementation
    it.skip('should start the subtitle app', async () => {
        
    })

})