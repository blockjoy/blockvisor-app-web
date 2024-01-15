export const getActiveTopic = (topic: string) => {
  if (!topic) return null;

  const orgTopicRegex = /^\/orgs\/[a-zA-Z0-9-]+$/;
  const nodeTopicRegex = /^\/orgs\/([\w-]+)(\/nodes)?$/;

  if (orgTopicRegex.test(topic)) return 'organization';
  else if (nodeTopicRegex.test(topic)) return 'nodes';
  else return null;
};
