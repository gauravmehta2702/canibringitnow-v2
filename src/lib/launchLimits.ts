export const launchLimits = {
  rules: 20,
  items: 20,
  itemGuides: 60,
  knowledgePages: 80,
  questionPages: 150,
  topicRules: 20,
} as const;

export const launchLimitNote =
  'First indexing batch keeps static export stable. Increase these limits gradually after each successful Cloudflare build and Search Console indexing check.';
