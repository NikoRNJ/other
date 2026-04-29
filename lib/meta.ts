type MetaPublishInput = {
  caption: string;
  mediaUrl?: string;
  linkUrl?: string;
};

const graphVersion = process.env.META_GRAPH_VERSION || 'v20.0';
const pageId = process.env.META_PAGE_ID;
const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;
const instagramBusinessId = process.env.META_INSTAGRAM_BUSINESS_ID;

function getGraphUrl(path: string) {
  return `https://graph.facebook.com/${graphVersion}${path}`;
}

export async function publishFacebookPost(input: MetaPublishInput) {
  if (!pageId || !pageAccessToken) {
    return {
      ok: false,
      mode: 'dry-run',
      message: 'Missing META_PAGE_ID or META_PAGE_ACCESS_TOKEN. Post was not sent to Meta.',
      payload: input,
    };
  }

  const body = new URLSearchParams({
    message: input.caption,
    access_token: pageAccessToken,
  });

  if (input.linkUrl) body.set('link', input.linkUrl);

  const response = await fetch(getGraphUrl(`/${pageId}/feed`), {
    method: 'POST',
    body,
  });

  const data = await response.json();

  return {
    ok: response.ok,
    mode: 'live',
    data,
  };
}

export async function publishInstagramImage(input: Required<Pick<MetaPublishInput, 'caption' | 'mediaUrl'>>) {
  if (!instagramBusinessId || !pageAccessToken) {
    return {
      ok: false,
      mode: 'dry-run',
      message: 'Missing META_INSTAGRAM_BUSINESS_ID or META_PAGE_ACCESS_TOKEN. Post was not sent to Meta.',
      payload: input,
    };
  }

  const createContainerBody = new URLSearchParams({
    image_url: input.mediaUrl,
    caption: input.caption,
    access_token: pageAccessToken,
  });

  const containerResponse = await fetch(getGraphUrl(`/${instagramBusinessId}/media`), {
    method: 'POST',
    body: createContainerBody,
  });

  const containerData = await containerResponse.json();

  if (!containerResponse.ok || !containerData.id) {
    return {
      ok: false,
      stage: 'create-container',
      mode: 'live',
      data: containerData,
    };
  }

  const publishBody = new URLSearchParams({
    creation_id: containerData.id,
    access_token: pageAccessToken,
  });

  const publishResponse = await fetch(getGraphUrl(`/${instagramBusinessId}/media_publish`), {
    method: 'POST',
    body: publishBody,
  });

  const publishData = await publishResponse.json();

  return {
    ok: publishResponse.ok,
    stage: 'publish',
    mode: 'live',
    data: publishData,
  };
}

export async function publishToSelectedNetworks(input: MetaPublishInput & { networks: Array<'facebook' | 'instagram'> }) {
  const results: Record<string, unknown> = {};

  if (input.networks.includes('facebook')) {
    results.facebook = await publishFacebookPost(input);
  }

  if (input.networks.includes('instagram')) {
    if (!input.mediaUrl) {
      results.instagram = {
        ok: false,
        message: 'Instagram image publishing requires mediaUrl.',
      };
    } else {
      results.instagram = await publishInstagramImage({ caption: input.caption, mediaUrl: input.mediaUrl });
    }
  }

  return results;
}
