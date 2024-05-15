import { test, expect } from "@playwright/test";

test("test mattermost login, init and message", async ({ page }) => {
  await page.goto("/unicorns/channels/town-square");

  const messageBox = page.getByRole('textbox', { name: 'Write to Town Square' });

  await messageBox.fill('Hello world!');
  await page.getByRole('button', { name: 'Send a message' }).click();

  await expect(messageBox).toBeEmpty();
  await expect(page.locator('#post-list .post-message__text').last()).toContainText('Hello world!');
});
