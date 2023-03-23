import { capitalize } from 'utils/capitalize';

const FEATURES_HEADINGS = {
  max_nodes: 'Nodes',
  max_organizations: 'Organizations',
  max_collaborators: 'Collaborators',
  support_type: 'Support',
};

export const getPlanFeatures = (features: any) =>
  Object.keys(features).map(
    (featureKey: string) =>
      `${capitalize(features[featureKey])} ${FEATURES_HEADINGS[featureKey]}`,
  );
