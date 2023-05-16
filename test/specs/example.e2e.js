"use strict";

const {
  ClassicRunner,
  AccessibilityGuidelinesVersion,
  VisualLocatorSettings,
  AccessibilityLevel,
  AccessibilityStatus,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  MatchLevel,
} = require("@applitools/eyes-webdriverio");

const assert = require("assert");

describe("My Login application", () => {
  let applitoolsApiKey;

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
    batch = new BatchInfo(
      "JLR Example: WebdriverIO JavaScript with the Classic Runner"
    );
    batch.setSequenceName("JLR");

    // Create a configuration for Applitools Eyes.
    config = new Configuration();

    //https://applitools.com/docs/features/contrast-accessibility.html
    config.setAccessibilityValidation({
      level: AccessibilityLevel.AA,
      guidelinesVersion: AccessibilityGuidelinesVersion.WCAG_2_1,
    });

    // Set the Applitools API key so test results are uploaded to your account.
    // If you don't explicitly set the API key with this call,
    // then the SDK will automatically read the `APPLITOOLS_API_KEY` environment variable to fetch it.
    config.setApiKey(applitoolsApiKey);

    // Set the batch for the config.
    config.setBatch(batch);
  });

  beforeEach(async function () {
    // Create the Applitools Eyes object connected to the runner and set its configuration.
    eyes = new Eyes(runner);
    eyes.setConfiguration(config);

    await eyes.open(
      browser,
      "Example: WebdriverIO JavaScript with the Classic Runner",
      this.currentTest.title
    );
  });

  //A basic app flow test
  it("opens the app in the android phone2", async () => {
    const loginXPATH = '//*[@resource-id="loginButton"]';

    await eyes.check(
      Target.window().fully(false)
      .withName("Login screen")
      // .ignore(loginXPATH)
      .ignoreDisplacements(true)
    );
    //Click the login button xpath = //*[contains(@text,"LOGIN")]
    await browser.$(loginXPATH).click();

    // browser.waitUntil(() => browser.$('//android.widget.ImageView[@content-desc="My Vehicle"]'), {timeout: 5000});

    await eyes.check(
      "After login",
      Target.window()
        .fully(false)
        .waitBeforeCapture(5000)
        .matchLevel(MatchLevel.Layout)
    );

    //await browser.$('//android.widget.Button').click(); //The Xpath may be non-specific
    //Fetch profile button using Applitools Visual Locator and click
    const regionsMap = await eyes.locate({ locatorNames: ["profile"] });
    const regionMapProfile = regionsMap["profile"];
    await browser.touchAction([
      { action: "press", x: regionMapProfile[0].x, y: regionMapProfile[0].y },
      { action: "release" },
    ]);

    //Validate the profile screen, regardless of the changes in Phone or number or Address.
    const addressXpath = '//*[@resource-id="addressItem"]';
    const phoneXpath = '//*[@resource-id="phoneItem"]';
    await eyes.check(
      "Profile screen",
      Target.window()
        .fully(true)
        .waitBeforeCapture(5000)
        .matchLevel(MatchLevel.Strict)
        .layoutRegion(phoneXpath)
        .layoutRegion(addressXpath)
    );
  }).timeout(10 * 60000);

  afterEach(async () => {
    // await eyes.closeAsync(); //recommended

    // Close Eyes to tell the server it should display the results. Access the result object
    const testResult = await eyes.close();
    console.log(testResult);
    console.log(testResult.getAccessibilityStatus());
    assert.equal(
      testResult.getAccessibilityStatus().status,
      AccessibilityStatus.Passed
    );
    // If you want the test to wait synchronously for all checkpoints to complete, then use `eyes.close()`.
    // If any checkpoints are unresolved or failed, then `eyes.close()` will make the ACME demo app test fail.
  });

  after(async () => {
    // Close the batch and report visual differences to the console.
    // Note that it forces Mocha to wait synchronously for all visual checkpoints to complete.
    await runner.getAllTestResults(false).then(console.log); //close the batch
  });
});
