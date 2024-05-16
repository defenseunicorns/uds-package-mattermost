import { test, expect } from "@playwright/test";
import consumers from 'stream/consumers';

test.beforeEach(async ({ page }) => {
  await page.goto("/unicorns/channels/town-square");

  await expect(async () => {
    // dismiss onboarding task list/overlays
    const onboarding = page
      .locator('div[class^="Overlay-"], .tour-tip__overlay');

    if (await onboarding.isVisible()) {
      await onboarding.click();
    }

    const messageBox = page.getByRole('textbox', { name: 'Write to Town Square' });

    await expect(
      messageBox,
      'message box is editable'
    ).toBeEditable();

    await messageBox.fill('no demos!');

    await expect(
      messageBox,
      'message box is editable'
    ).toBeFocused();

    await expect(
      onboarding,
      'onboarding overlays have been dismissed'
    ).toBeHidden();

    await messageBox.clear();
  }).toPass({ timeout: 10_000 });
});

function randomMessage(extra: string = "") {
  return `hello universe ${Math.floor((Math.random() * 1000))}-C3!` + extra;
}

test("send a message", async ({ page }) => {
  const message = randomMessage();
  const messageBox = page.getByRole('textbox', { name: 'Write to Town Square' });

  await messageBox.fill(message);
  await page.getByRole('button', { name: 'Send a message' }).click();

  await expect(messageBox).toBeEmpty();
  expect(page.locator('#post-list .post', { hasText: message })).toBeDefined();
});

test("send a message with attachment", async ({ page }) => {
  const messageBox = page.getByRole('textbox', { name: 'Write to Town Square' });

  const message = randomMessage('\ncheckout this attachment...');
  await messageBox.fill(message);

  const upload = Buffer.from('# My Cool Project');

  await page.getByLabel('Upload files')
    .setInputFiles({
      name: 'README.md',
      buffer: upload,
      mimeType: 'text/plain'
    });

  await page.getByRole('button', { name: 'Send a message' }).click();
  await expect(messageBox).toBeEmpty();

  const downloadEvent = page.waitForEvent('download');

  const post = page.locator('#post-list .post__body', { hasText: message });

  await expect(post).toBeDefined();

  await post.getByRole('link', { name: 'download' }).click();

  const download = await downloadEvent;

  expect(download.suggestedFilename()).toBe('README.md');

  const rs = await download.createReadStream();
  const data = await consumers.buffer(rs);
  expect(data.equals(upload)).toBe(true);
});
