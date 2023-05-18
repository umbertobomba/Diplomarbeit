const { beforeEach } = require('mocha');
const suitest = require('suitest-js-api');
const {assert, VRC, PROP} = suitest;
const { openService, 
    openHelpPage, 
    navigateTo, 
    handleNoErrorMessageOnScreen, 
    compareUrlChangeWhenNavigatingArticles, 
    generalSleep, 
    generalInterval,
} = require('./common');

describe('Open pages from index', () => {
    beforeEach(async() => {
        await openService();
    })

    it('should display the index page and swimlanes', async () => {
        await suitest.sleep(generalSleep);
        await assert.element('error_element').doesNot().exist();
        await assert.element('scrollContent_firstItem').exists();
        await assert.element('scrollContent_secondItem').exists();
    })

    it('should display the News page', async () => {
        await navigateTo('News');
        await suitest.sleep(generalSleep);
        await suitest.press(VRC.DOWN);
        await suitest.sleep(generalSleep);
        await assert.element('gridNavigation_firstItem').isNot().visible();
    })

    it('should display the Sport page', async () => {
        await navigateTo('Sport');
        await suitest.sleep(generalSleep);
        await suitest.press(VRC.DOWN);
        await suitest.sleep(generalSleep);
        await assert.element('sportLiveDataPlaceholder').visible();
    })

    it('should display the Meteo page', async () => {
        await navigateTo('Meteo');
        await suitest.sleep(generalSleep);
        await suitest.press(VRC.DOWN);
        await suitest.sleep(generalSleep);
        await assert.element('articleLeftSideContent').visible();
    })

    it('should display the Help page', async () => {
        await openHelpPage();
        await suitest.sleep(generalSleep);
        await assert.element('helpPageTitle').visible();
    })
})

describe('News page', () => {
    beforeEach(async() => {
        await openService();
        await navigateTo('News');
    })

    it('open article in "Übersicht" should display content', async () => {
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
    })
    
    it('open article in "Inland" should display content', async () => {
        await navigateTo('Inland');
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
        await assert.element('previousArticleItem').doesNot().exist();
    })
    
    it('open article in "Ausland" should display content', async () => {
        await navigateTo('Ausland');
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();        
    })

    it('open article in "Wirtschaft" should display content', async () => {
        await navigateTo('Wirtschaft');
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it('open article in "Kultur" should display content', async () => {
        await navigateTo('Kultur');
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it('open article in "Gesichter & Geschichten" should display content', async () => {
        await navigateTo('Gesichter & Geschichten');
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it('open article in "Vermischtes" should display content', async () => {
        await navigateTo('Vermischtes');
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it.skip('open article in "Dossiers" should display content', async () => {
        await navigateTo('Dossiers');
        await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it('should display next/previous article when navigating in detailview', async () => {
        await suitest.press([VRC.RIGHT, VRC.ENTER, VRC.DOWN, VRC.ENTER]).interval(generalInterval); 
        await suitest.sleep(generalSleep);
        
        await compareUrlChangeWhenNavigatingArticles();
    })
})

describe('Sport News page', () => {
    beforeEach(async() => {
        await openService();
        await navigateTo('Sport');
    })

    it('open article in "Übersicht" should display content', async ( )=> {
        await suitest.press([VRC.DOWN, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it('open article in "Fussball" should display content', async ( )=> {
        await navigateTo('Fussball');
        await suitest.press([VRC.DOWN, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').doesNot().exist();
        await assert.element('articleLeftSideContent').visible(); 
    })

    it('open article in "Eishockey" should display content', async ( )=> {
        await navigateTo('Eishockey');
        await suitest.press([VRC.DOWN, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible(); 
    })

    it('open article in "Sport-Mix" should display content', async ( )=> {
        await navigateTo('Sport-Mix');
        await suitest.press([VRC.DOWN, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);  
        
        await assert.element('nextArticleItem').visible();
        await assert.element('previousArticleItem').visible();
        await assert.element('articleLeftSideContent').visible(); 
    })

    it('should display next/previous article when navigating in detailview', async () => {
        await suitest.press([VRC.RIGHT, VRC.ENTER, VRC.DOWN, VRC.RIGHT, VRC.ENTER]).interval(1000); 
        await suitest.sleep(1000);
        
        await compareUrlChangeWhenNavigatingArticles();
    })
})

describe('Sport live results', () => {
    describe('Live today', async () => {
        beforeEach(async() => {
            await openService();
            await navigateTo('Sport');
            await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);
        })

        it('should display content for all three days', async () => {
            await suitest.press(VRC.DOWN).interval(generalInterval);
            await assert.element('todaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.LEFT, VRC.ENTER]).interval(generalInterval);
            await assert.element('yesterdaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.RIGHT, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);
            await assert.element('tomorrowSubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
        })
    })

    describe('Football', async () => {
        beforeEach(async() => {
            await openService();
            await navigateTo('Sport');
            await suitest.press([VRC.DOWN, VRC.ENTER, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);
        })

        it('should display content for all three days', async () => {
            await suitest.press(VRC.DOWN).interval(generalInterval);
            await assert.element('todaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.LEFT, VRC.ENTER]).interval(generalInterval);
            await assert.element('yesterdaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.RIGHT, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);
            await assert.element('tomorrowSubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Super League" content', async () => {
            await navigateTo('Super League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Challenge League" content', async () => {
            await navigateTo('Challenge League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Schweizer Cup" content', async () => {
            await navigateTo('Schweizer Cup');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "1. Liga" content', async () => {
            await navigateTo('1. Liga');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Womens Super League" content', async () => {
            await navigateTo("Women's Super League");
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Champions League" content', async () => {
            await navigateTo('Champions League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Europa League" content', async () => {
            await navigateTo('Europa League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Conference League" content', async () => {
            await navigateTo('Conference League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Bundesliga" content', async () => {
            await navigateTo('Bundesliga');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "DFB-Pokal" content', async () => {
            await navigateTo('DFB-Pokal');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Premier League" content', async () => {
            await navigateTo('Premier League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "FA Cup" content', async () => {
            await navigateTo('FA Cup');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "LaLiga" content', async () => {
            await navigateTo('LaLiga');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Copa del Rey" content', async () => {
            await navigateTo('Copa del Rey');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Serie A" content', async () => {
            await navigateTo('Serie A');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Coppa Italia" content', async () => {
            await navigateTo('Coppa Italia');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Ligue 1" content', async () => {
            await navigateTo('Ligue 1');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Coupe de France" content', async () => {
            await navigateTo('Coupe de France');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "WM 2022" content', async () => {
            await navigateTo('WM 2022');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "EURO-Qualifikation" content', async () => {
            await navigateTo('EURO-Qualifikation');
            await handleNoErrorMessageOnScreen();
        })
    })

    describe('Hockey', async () => {
        beforeEach(async() => {
            await openService();
            await navigateTo('Sport');
            await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);
            await suitest.press(VRC.RIGHT).repeat(2).interval(generalInterval);
            await suitest.press(VRC.ENTER).interval(generalInterval);
        })

        it('should display content for all three days', async () => {
            await suitest.press(VRC.DOWN).interval(generalInterval);
            await assert.element('todaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.LEFT, VRC.ENTER]).interval(generalInterval);
            await assert.element('yesterdaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.RIGHT, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);
            await assert.element('tomorrowSubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
        })

        it('should display "National League" content', async () => {
            await navigateTo('National League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Swiss League" content', async () => {
            await navigateTo('Swiss League');
            await handleNoErrorMessageOnScreen();
        })
        
        it('should display "Womens League" content', async () => {
            await navigateTo("Women's League");
            await handleNoErrorMessageOnScreen();
        })

        it('should display "NHL" content', async () => {
            await navigateTo('NHL');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Champions Hockey League" content', async () => {
            await navigateTo('Champions Hockey League');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "EHT - Tschechien" content', async () => {
            await navigateTo('EHT - Tschechien');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "WM" content', async () => {
            await navigateTo('WM');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "WM Frauen" content', async () => {
            await navigateTo('WM Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Testspiele" content', async () => {
            await navigateTo('Testspiele');
            await handleNoErrorMessageOnScreen();
        })
    })

    describe('Tennis', async () => {
        beforeEach(async() => {
            await openService();
            await navigateTo('Sport');
            await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);
            await suitest.press(VRC.RIGHT).repeat(3).interval(generalInterval);
            await suitest.press(VRC.ENTER).interval(generalInterval);
        })

        it('should display content for all three days', async () => {
            await suitest.press(VRC.DOWN).interval(generalInterval);
            await assert.element('todaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.LEFT, VRC.ENTER]).interval(generalInterval);
            await assert.element('yesterdaySubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
            
            await suitest.press([VRC.RIGHT, VRC.RIGHT, VRC.ENTER]).interval(generalInterval);
            await assert.element('tomorrowSubNavItem').matches([ PROP.CLASS ])
            await handleNoErrorMessageOnScreen();
        })

        it('should display "ATP" content', async () => {
            await navigateTo('ATP');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "ATP Finals" content', async () => {
            await navigateTo('ATP Finals');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Davis Cup" content', async () => {
            await navigateTo('Davis Cup');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "United Cup" content', async () => {
            await navigateTo('United Cup');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "WTA" content', async () => {
            await navigateTo('WTA');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "WTA Finals" content', async () => {
            await navigateTo('WTA Finals');
            await handleNoErrorMessageOnScreen();
        })

        it('should display "Billie Jean King Cup" content', async () => {
            await navigateTo('Billie Jean King Cup');
            await handleNoErrorMessageOnScreen();
        })
    })

    describe('Other Sports', async () => {
        beforeEach(async() => {
            await openService();
            await navigateTo('Sport');
            await suitest.press([VRC.DOWN, VRC.ENTER]).interval(generalInterval);
        })
        
        it('Cycling should display "World Tour" content', async () => {
            await navigateTo('Rad');
            await handleNoErrorMessageOnScreen();
        })

        it('Cycling should display "World Tour Women" content', async () => {
            await navigateTo('Rad');
            await navigateTo('World Tour Women');
            await handleNoErrorMessageOnScreen();
        })

        it('Cycling should display "WM" content', async () => {
            await navigateTo('Rad');
            await navigateTo('WM');
            await handleNoErrorMessageOnScreen();
        })

        it('Mountainbike should display "Weltcup Männer" content', async () => {
            await navigateTo('Mountainbike');
            await handleNoErrorMessageOnScreen();
        })

        it('Mountainbike should display "Weltcup Frauen" content', async () => {
            await navigateTo('Mountainbike');
            await navigateTo('Weltcup Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('Mountainbike should display "WM" content', async () => {
            await navigateTo('Mountainbike');
            await navigateTo('WM');
            await handleNoErrorMessageOnScreen();
        })

        it('Mountainbike should display "EM" content', async () => {
            await navigateTo('Mountainbike');
            await navigateTo('EM');
            await handleNoErrorMessageOnScreen();
        })
        
        it('Formula 1 should display "WM" content', async () => {
            await navigateTo('Formel 1');
            await handleNoErrorMessageOnScreen();
        })
        
        it('Moto should display "Moto GP" content', async () => {
            await navigateTo('Motorrad');
            await handleNoErrorMessageOnScreen();
        })
        
        it('Moto should display "Moto 2" content', async () => {
            await navigateTo('Motorrad');
            await navigateTo('Moto 2');
            await handleNoErrorMessageOnScreen();
        })

        it('Moto should display "Moto 3" content', async () => {
            await navigateTo('Motorrad');
            await navigateTo('Moto 3');
            await handleNoErrorMessageOnScreen();
        })

        it('Handball should display "NLA Männer" content', async () => {
            await navigateTo('Handball');
            await handleNoErrorMessageOnScreen();
        })

        it('Handball should display "SPL1 Frauen" content', async () => {
            await navigateTo('Handball');
            await navigateTo('SPL1 Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('Handball should display "WM Männer" content', async () => {
            await navigateTo('Handball');
            await navigateTo('WM Männer');
            await handleNoErrorMessageOnScreen();
        })

        it('Handball should display "EM Männer" content', async () => {
            await navigateTo('Handball');
            await navigateTo('EM Männer');
            await handleNoErrorMessageOnScreen();
        })

        it('Handball should display "EM Frauen" content', async () => {
            await navigateTo('Handball');
            await navigateTo('EM Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('Volleyball should display "NLA Männer" content', async () => {
            await navigateTo('Volleyball');
            await handleNoErrorMessageOnScreen();
        })

        it('Volleyball should display "NLA Frauen" content', async () => {
            await navigateTo('Volleyball');
            await navigateTo('NLA Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('Volleyball should display "EM Männer" content', async () => {
            await navigateTo('Volleyball');
            await navigateTo('EM Männer');
            await handleNoErrorMessageOnScreen();
        })

        it('Volleyball should display "EM Frauen" content', async () => {
            await navigateTo('Volleyball');
            await navigateTo('EM Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('Basketball should display "NLA Männer" content', async () => {
            await navigateTo('Basketball');
            await handleNoErrorMessageOnScreen();
        })

        it('Basketball should display "NLA Frauen" content', async () => {
            await navigateTo('Basketball');
            await navigateTo('NLA Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('Basketball should display "NBA" content', async () => {
            await navigateTo('Basketball');
            await navigateTo('NBA');
            await handleNoErrorMessageOnScreen();
        })

        it('Unihockey should display "UPL Männer" content', async () => {
            await navigateTo('Unihockey');
            await handleNoErrorMessageOnScreen();
        })

        it('Unihockey should display "UPL Frauen" content', async () => {
            await navigateTo('Unihockey');
            await navigateTo('UPL Frauen');
            await handleNoErrorMessageOnScreen();
        })

        it('Unihockey should display "WM Männer" content', async () => {
            await navigateTo('Unihockey');
            await navigateTo('WM Männer');
            await handleNoErrorMessageOnScreen();
        })

        it('Unihockey should display "WM Frauen" content', async () => {
            await navigateTo('Unihockey');
            await navigateTo('WM Frauen');
            await handleNoErrorMessageOnScreen();
        })
    })
})

describe('Meteo', async () => {
    beforeEach(async() => {
        await openService();
        await navigateTo('Meteo');
    })

    it('should display content for "Allgemeine Lage"', async () => {
        await assert.element('articleLeftSideContent').visible();
    })

    it('should display content for "Prognose"', async () => {
        await suitest.press([VRC.RIGHT, VRC.ENTER]).interval(generalInterval);
        await assert.element('subNavContainer').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it('should display content for "Aussichten"', async () => {
        await suitest.press(VRC.RIGHT).repeat(2).interval(generalInterval);
        await suitest.press(VRC.ENTER).interval(generalInterval);
        await assert.element('subNavContainer').visible();
        await assert.element('articleLeftSideContent').visible();
    })

    it('should display content for "Trend"', async () => {
        await suitest.press(VRC.RIGHT).repeat(3).interval(generalInterval);
        await suitest.press(VRC.ENTER).interval(generalInterval);
        await assert.element('articleLeftSideContent').visible();
    })
})

describe('Help', async () => {
    beforeEach(async() => {
        await openService();
        await openHelpPage();
    })

    it('should display content for "FAQ"', async () => {
        await assert.element('helpPageTitle').visible();
    })
    it('should display content for "Kontakt"', async () => {
        await suitest.press([VRC.RIGHT, VRC.ENTER]).interval(generalInterval);
        await assert.element('helpPageTitle').visible();
    })
    it('should display content for "Datenschutz"', async () => {
        await suitest.press(VRC.RIGHT).repeat(2).interval(generalInterval);
        await suitest.press(VRC.ENTER).interval(generalInterval);
        await assert.element('helpPageTitle').visible();
    })
})