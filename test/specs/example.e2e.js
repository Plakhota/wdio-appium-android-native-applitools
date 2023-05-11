'use strict';

const {

    EyesRunner,
  ClassicRunner,
  

    Eyes,
    Target,
    RectangleSize,
    Configuration,
    BatchInfo, 
    BrowserType,
    By} = require('@applitools/eyes-webdriverio');

describe('My Login application', () => {

    var applitoolsApiKey;

    // Applitools objects to share for all tests
    let batch;
    let config;
    let runner;
  
    // Test-specific objects
    let eyes;

    

    before(async () => {
        applitoolsApiKey = process.env.APPLITOOLS_API_KEY;

    // Create the classic runner.
         runner = new ClassicRunner();

    // Create a new batch for tests.
    // A batch is the collection of visual checkpoints for a test suite.
    // Batches are displayed in the Eyes Test Manager, so use meaningful names.
         batch = new BatchInfo('Example: WebdriverIO JavaScript with the Classic Runner');

    // Create a configuration for Applitools Eyes.
         config = new Configuration();
    
    // Set the Applitools API key so test results are uploaded to your account.
    // If you don't explicitly set the API key with this call,
    // then the SDK will automatically read the `APPLITOOLS_API_KEY` environment variable to fetch it.
         config.setApiKey(applitoolsApiKey);

    // Set the batch for the config.
            config.setBatch(batch);


    });

      
  beforeEach(async function () {
    // This method sets up each test with its own ChromeDriver and Applitools Eyes objects.
    
    // Create the Applitools Eyes object connected to the runner and set its configuration.
    eyes = new Eyes(runner);
    eyes.setConfiguration(config);

    // Open Eyes to start visual testing.
    // It is a recommended practice to set all four inputs:

    // const mydevice =  await device.launchApp();


    await eyes.open(browser, 'Example: WebdriverIO JavaScript with the Classic Runner', this.currentTest.title);
    
  });


//   it('opens the app in the android phone1', async () => {
//         await eyes.check('Login Window', Target.window().fully(false));  

//     })


    it('opens the app in the android phone2', async () => {
      //[{"key":"elementId","value":"00000000-0000-00d4-3b9a-ca2400000007","name":"elementId"},{"key":"index","value":"2","name":"index"},{"key":"package","value":"com.jaguarlandrover.rangerover.app","name":"package"},{"key":"class","value":"android.widget.Button","name":"class"},{"key":"text","value":"","name":"text"},{"key":"checkable","value":"false","name":"checkable"},{"key":"checked","value":"false","name":"checked"},{"key":"clickable","value":"false","name":"clickable"},{"key":"enabled","value":"true","name":"enabled"},{"key":"focusable","value":"false","name":"focusable"},{"key":"focused","value":"false","name":"focused"},{"key":"long-clickable","value":"false","name":"long-clickable"},{"key":"password","value":"false","name":"password"},{"key":"scrollable","value":"false","name":"scrollable"},{"key":"selected","value":"false","name":"selected"},{"key":"bounds","value":"[901,74][1069,200]","name":"bounds"},{"key":"displayed","value":"true","name":"displayed"}]

      //Click the login button xpath = //*[contains(@text,"LOGIN")]
      await browser.$('//*[contains(@text,"LOGIN")]').click();

      //click on Allow to send notifications

      //[{"key":"elementId","value":"00000000-0000-019d-0000-008c00000007","name":"elementId"},{"key":"index","value":"0","name":"index"},{"key":"package","value":"com.jaguarlandrover.rangerover.app","name":"package"},{"key":"class","value":"android.widget.ImageView","name":"class"},{"key":"text","value":"","name":"text"},{"key":"content-desc","value":"My Vehicle","name":"content-desc"},{"key":"checkable","value":"false","name":"checkable"},{"key":"checked","value":"false","name":"checked"},{"key":"clickable","value":"false","name":"clickable"},{"key":"enabled","value":"true","name":"enabled"},{"key":"focusable","value":"false","name":"focusable"},{"key":"focused","value":"false","name":"focused"},{"key":"long-clickable","value":"false","name":"long-clickable"},{"key":"password","value":"false","name":"password"},{"key":"scrollable","value":"false","name":"scrollable"},{"key":"selected","value":"false","name":"selected"},{"key":"bounds","value":"[126,467][954,1019]","name":"bounds"},{"key":"displayed","value":"true","name":"displayed"}]
    //   $('//android.widget.ImageView[@content-desc="My Vehicle"]').waitForDisplayed({timeout: 7000});

      await eyes.check(
        "Login Window",
        Target.window().fully(true)
        // .waitBeforeCapture(1000)
        );
    })

    // it('opens the app in the android phone1', async () => {
    //     await eyes.check('Login Window', Target.window().fully(false));  

    // })

    afterEach(async () => {

        // Close Eyes to tell the server it should display the results.
       await eyes.close(false);
        // const testResults = await eyes.close(false);
        // console.log(testResults);
    
        // Quit the WebdriverIO instance
    
        // Warning: `eyes.closeAsync()` will NOT wait for visual checkpoints to complete.
        // You will need to check the Eyes Test Manager for visual results per checkpoint.
        // Note that "unresolved" and "failed" visual checkpoints will not cause the Mocha test to fail.
    
        // If you want the ACME demo app test to wait synchronously for all checkpoints to complete, then use `eyes.close()`.
        // If any checkpoints are unresolved or failed, then `eyes.close()` will make the ACME demo app test fail.
      });
      
      after(async () => {
        // Close the batch and report visual differences to the console.
        // Note that it forces Mocha to wait synchronously for all visual checkpoints to complete.
        await runner.getAllTestResults(false).then(console.log);
        
      });
      
})

