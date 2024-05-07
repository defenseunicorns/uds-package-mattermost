import { test, expect, Page } from "@playwright/test";

export const randomSuffix = () => {
  return Math.random().toString().substring(2, 6);
};

export const currentDateTime = () => {
  return Date();
};

async function loginToMattermost(page: Page) {
  await page.goto("https://chat.uds.dev/");
  await page.goto("https://chat.uds.dev/landing#/");
  await page.getByRole("link", { name: "View in Browser" }).click();
  await page.getByRole("link", { name: "Gitlab Icon GitLab" }).click();
  await page.getByLabel("Username or email").click();
  await page.getByLabel("Username or email").fill("doug");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("unicorn123!@#");
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForURL(
    /\/preparing-workspace|\/unicorns\/channels\/town-square/,
  );
}

async function setupWorkspace(page: Page) {
  await page.getByPlaceholder("Organization name").click();
  await page.getByPlaceholder("Organization name").fill("Unicorns");
  await page.getByTestId("continue").click();
  await page.getByRole("button", { name: "Skip" }).click();
  await page.getByRole("button", { name: "Finish setup" }).click();
  await page.waitForURL(/\/unicorns\/channels\/town-square/);
  await page.locator("button").filter({ hasText: "7" }).click();
  const button = page.locator('role=button[name="Not now"]');
  if (await button.isVisible()) {
    await button.click();
  }
  await page.getByRole("button", { name: "Not now" }).click();
}

async function createChannelAndPostMessage(page: Page) {
  await page
    .getByLabel("channel sidebar region")
    .getByLabel("Add Channel Dropdown")
    .click();
  await page.getByLabel("Create new channel").click();
  await page
    .getByPlaceholder("Enter a name for your new")
    .fill("testchannel" + randomSuffix());
  await page.getByRole("button", { name: "Create channel" }).click();
  await page.getByTestId("post_textbox").click();
  await page
    .getByTestId("post_textbox")
    .fill("Hello! from playwright on " + currentDateTime());
  await page.getByTestId("SendMessageButton").click();
}

async function logout(page: Page) {
  await page.getByLabel("Current status: Online.").click();
  await page.getByLabel("Log Out").click();
}

test("test mattermost login, init and message", async ({ page, context }) => {
  await loginToMattermost(page);

  const finalUrl = page.url();

  if (finalUrl.endsWith("/preparing-workspace")) {
    await setupWorkspace(page);
  } else {
    await page.waitForURL(/\/unicorns\/channels\/town-square/);
  }

  expect(
    page.getByLabel("set status").locator("div").filter({ hasText: "@doug" }),
  ).toBeTruthy();
  expect(page.url()).toContain("/unicorns/channels/town-square");

  const cookies = await context.cookies();
  const keycloakCookie = cookies.find(
    (cookie) => cookie.name === "KEYCLOAK_SESSION",
  );

  expect(keycloakCookie).toBeDefined();
  expect(keycloakCookie?.value).not.toBe("");
  expect(keycloakCookie?.domain).toContain("sso.uds.dev");

  await createChannelAndPostMessage(page);
  await logout(page);
});
