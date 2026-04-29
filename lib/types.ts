export type SocialNetwork = 'instagram' | 'facebook';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export type SocialPost = {
  id: string;
  title: string;
  baseIdea: string;
  caption: string;
  hashtags: string[];
  cta: string;
  networks: SocialNetwork[];
  status: PostStatus;
  scheduledAt: string | null;
  mediaUrl: string | null;
  createdAt: string;
};

export type IncomingMessage = {
  id: string;
  network: SocialNetwork;
  authorName: string;
  text: string;
  intent: 'price' | 'interest' | 'support' | 'spam' | 'unknown';
  suggestedReply: string | null;
  isLead: boolean;
  createdAt: string;
};

export type GeneratePostRequest = {
  idea: string;
  audience?: string;
  format?: 'post' | 'story' | 'ad';
};

export type GenerateReplyRequest = {
  message: string;
  context?: string;
};
