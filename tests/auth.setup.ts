import { test as setup, expect } from '@playwright/test';
import { authFile } from './playwright.config';

setup('authenticate', async ({ page, context, baseURL }) => {
  await page.goto('/login');

  await page.getByRole("link", { name: "View in Browser" }).click();
  await page.getByRole("link", { name: "Gitlab Icon GitLab" }).click();
  await page.getByLabel("Username or email").fill("doug");
  await page.getByLabel("Password").fill("unicorn123!@#");
  await page.getByRole("button", { name: "Log In" }).click();

  // ensure auth cookies were set
  const cookies = await context.cookies();
  const keycloakCookie = cookies.find(
    (cookie) => cookie.name === "KEYCLOAK_SESSION",
  );

  expect(keycloakCookie).toBeDefined();
  expect(keycloakCookie?.value).not.toBe("");
  expect(keycloakCookie?.domain).toContain("sso.uds.dev");

  await page.context().storageState({ path: authFile });

  await page.waitForURL('/');

  // one-time workspace setup (when login redirects to "/preparing-workspace")
  const heading = page.locator('.Organization-form-wrapper');
  if (await heading.isVisible()) {
    await page.getByPlaceholder("Organization name").fill("Unicorns");
    await page.getByTestId("continue").click();
    await page.getByRole("button", { name: "Skip" }).click();
    await page.getByRole("button", { name: "Finish setup" }).click();
  };

  await page.goto('/unicorns/channels/town-square');

  // dismiss onboarding task list
  const onboarding = page.getByText('No thanks, I’ll figure it out');
  if (await onboarding.isVisible()) {
    await onboarding.click();
  }

  await page.getByRole('textbox', { name: 'Write to Town Square' }).fill('prompt for draft', { force: true });

  // dismiss draft feature overlay
  const button = page.locator('role=button[name="Not now"]');
  if (await button.isVisible()) {
    await button.click();
  }
});
