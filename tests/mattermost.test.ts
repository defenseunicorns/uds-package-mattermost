import { test, expect, request, APIRequestContext, Page } from "@playwright/test";
import consumers from 'stream/consumers';

type Channel = { id: string; name: string; display_name: string; };

let apiCtx: APIRequestContext;
let channel: Channel;

test.beforeEach(async ({ context, baseURL }) => {
  const cookies = await context.cookies();
  const token = cookies.find(c => c.name === 'MMAUTHTOKEN');

  expect(token?.value).toBeDefined();

  apiCtx = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token?.value}`,
      'X-Requested-With': 'XMLHttpRequest', // without this you get "Invalid or expired session, please login again."
    }
  });

  // poll channel list in case default channels haven't been created yet
  await expect(async () => {
    const channels = await apiCtx.get('/api/v4/channels')
      .then(res => res.json());

    expect(channels.length).toBeGreaterThanOrEqual(1);

    channel = channels.find((c: Channel) => c.display_name === 'Town Square');
    expect(channel).toBeDefined();
    expect(channel.display_name).toBe('Town Square');
  }).toPass({
    timeout: 60_000,
  });
});

function randomMessage(extra: string = "") {
  return `hello universe ${Math.floor((Math.random() * 1000))}-C3!` + extra;
}

async function createPost(page: Page, data: { channel_id: string, message: string; file_ids?: string[] }) {
  const req = await apiCtx.post('/api/v4/posts', {
    data,
  });

  expect(req).toBeOK();

  const post = await req.json();

  expect(post.id).toBeDefined();
  expect(post.message).toBe(data.message);

  return post;
}

test("send a message", async ({ page }) => {
  const post = await createPost(page, {
    channel_id: channel.id,
    message: randomMessage(),
  });

  await page.goto('/unicorns/channels/town-square');

  const el = page.locator(`#post_${post.id}`);
  await expect(el).toContainText(post.message, { timeout: 60_000 });
});

test("send a message with attachment", async ({ page }) => {
  const file = {
    name: 'README.md',
    mimeType: 'text/plain',
    buffer: Buffer.from('# My Cool Project'),
  };

  const upload = await apiCtx.fetch('/api/v4/files', {
    method: 'POST',
    multipart: {
      channel_id: channel.id,
      files: file,
    },
  });

  expect(upload).toBeOK();

  const res = await upload.json();

  expect(res.file_infos.length).toBe(1);
  expect(res.file_infos[0].name).toBe(file.name);

  const message = randomMessage('\ncheckout this attachment...');
  const post = await createPost(page, {
    channel_id: channel.id,
    message,
    file_ids: [ res.file_infos[0].id ],
  });

  await page.goto('/unicorns/channels/town-square');

  const el = page.locator(`#post_${post.id}`);
  await expect(el).toContainText(post.message, { timeout: 60_000 });

});
