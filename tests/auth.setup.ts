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

  await page.waitForURL(url => url.pathname === '/' || url.pathname === '/preparing-workspace');

  // one-time workspace setup (when login redirects to "/preparing-workspace")
  if (page.url().endsWith('/unicorns/channels/town-square')) {
    const orgInput = page.getByPlaceholder("Organization name");
    await orgInput.isVisible();
    await orgInput.fill("Unicorns");
    await page.getByTestId("continue").click();
    await page.getByRole("button", { name: "Skip" }).click();
    await page.getByRole("button", { name: "Finish setup" }).click();
  };
})
