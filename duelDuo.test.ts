
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
    // await driver.sleep(3000); 
    expect(displayed).toBe(true)
})

test('clicking draw button displays div with id = choices', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.sleep(3000);
    const choices = await driver.findElement(By.id('choices'));
    const isDisplayed = await choices.isDisplayed();
    expect(isDisplayed).toBeTruthy();
})

test('clicking an add to duo button displays the div with id = player-id', async () => {
    await driver.findElement(By.className('bot-btn')).click();
    await driver.sleep(3000);
    const player = driver.findElement(By.id('player-duo'));
    await driver.sleep(3000);
    expect(player).toBeTruthy();
})