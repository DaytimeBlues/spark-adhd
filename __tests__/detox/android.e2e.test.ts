import {test, expect} from '@playwright/test';

test.describe('Android E2E Tests', () => {
  test.beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('should launch app successfully', async () => {
    await expect(element(by.text('Spark'))).toBeVisible();
  });

  test('should display all mode cards', async () => {
    await expect(element(by.text('Ignite'))).toBeVisible();
    await expect(element(by.text('Fog Cutter'))).toBeVisible();
    await expect(element(by.text('Pomodoro'))).toBeVisible();
    await expect(element(by.text('Anchor'))).toBeVisible();
    await expect(element(by.text('Check In'))).toBeVisible();
    await expect(element(by.text('Crisis Mode'))).toBeVisible();
  });

  test('should navigate to Ignite screen', async () => {
    await element(by.text('Ignite')).tap();
    await expect(element(by.text('5-Minute Focus Timer'))).toBeVisible();
    await expect(element(by.text('Start'))).toBeVisible();
  });

  test('should start and pause Ignite timer', async () => {
    await element(by.text('Ignite')).tap();
    await element(by.text('Start')).tap();
    await expect(element(by.text('Pause'))).toBeVisible();
    await element(by.text('Pause')).tap();
    await expect(element(by.text('Start'))).toBeVisible();
  });

  test('should navigate to Brain Dump', async () => {
    await element(by.id('Tasks')).tap();
    await expect(element(by.text('Brain Dump'))).toBeVisible();
    await expect(element(by.text('Clear your mind'))).toBeVisible();
  });

  test('should add item to Brain Dump', async () => {
    await element(by.id('Tasks')).tap();
    await element(by.placeholderText("What's on your mind?")).typeText('Test task');
    await element(by.text('Dump')).tap();
    await expect(element(by.text('Test task'))).toBeVisible();
  });

  test('should navigate to Calendar', async () => {
    await element(by.id('Calendar')).tap();
    await expect(element(by.text('Calendar'))).toBeVisible();
  });

  test('should navigate to Crisis Mode', async () => {
    await element(by.text('Crisis Mode')).tap();
    await expect(element(by.text("You're not alone"))).toBeVisible();
    await expect(element(by.text('988'))).toBeVisible();
  });
});
