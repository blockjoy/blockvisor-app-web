export const getActiveChannel = (channel: string) => {
  if (!channel) return null;

  const orgChannelRegex = /^\/orgs\/[a-zA-Z0-9-]+$/;
  const nodeChannelRegex = /^\/orgs\/([\w-]+)(\/nodes)?$/;

  if (orgChannelRegex.test(channel)) return 'organization';
  else if (nodeChannelRegex.test(channel)) return 'nodes';
  else return null;
};
