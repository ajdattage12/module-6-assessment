
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('clicking draw button displays div with id = choices', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.sleep(3000);
    const choices = await driver.findElement(By.id('choices'));
    const isDisplayed = await choices.isDisplayed();
    expect(isDisplayed).toBeTruthy();
})

test('clicking add to duo button displays the div with id = player-duo', async () => {
    await driver.findElement(By.id('draw')).click();
    await driver.sleep(3000);
    await driver.findElement(By.xpath('(//button[text()="Add to Duo"])[1]')).click();
    await driver.sleep(3000);
    const playerDuo = await driver.findElement(By.id("player-duo"))
    const displayed = await playerDuo.isDisplayed();
    expect(displayed).toBeTruthy();
})

test('removed bot goes back to choices', async () => {
    await driver.findElement(By.id('draw')).click();
    await driver.sleep(3000);
    await driver.findElement(By.xpath('(//button[text()="Add to Duo"])[1]')).click();
    await driver.sleep(3000);
    await driver.findElement(By.xpath('(//button[text()="Remove from Duo"]')).click();
    const returnedCard = await driver.findElement(By.xpath('(//div[@class="bot-card outline"][5])'));
    const displayed = await returnedCard.isDisplayed();
    expect(displayed).toBeTruthy();
})