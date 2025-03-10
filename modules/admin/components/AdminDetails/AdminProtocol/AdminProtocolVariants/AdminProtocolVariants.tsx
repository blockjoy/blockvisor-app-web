import { css } from '@emotion/react';
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import {
  Protocol,
  ProtocolVersion,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import { sortVersions } from '@modules/node';
import { Badge, sort } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './AdminProtocolVariants.styles';

type Props = {
  protocol: Protocol;
  onSelectVersion: (version: ProtocolVersion) => void;
};

export const AdminProtocolVariants = ({ protocol, onSelectVersion }: Props) => {
  const renderVersions = () => {
    const groupedByVariantKey = protocol.versions.reduce((acc, item) => {
      const key = item?.versionKey?.variantKey!;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    const variants = sort(
      Object.keys(groupedByVariantKey).map((variantKey) => ({
        variantKey,
        versions: groupedByVariantKey[variantKey],
      })),
      { field: 'variantKey' },
    );

    return (
      <>
        <ul css={styles.variants}>
          {variants.map((variant) => (
            <li key={variant.variantKey}>
              <h2 css={styles.variantHeader}>{variant.variantKey}</h2>
              <ul>
                {sortVersions(variant.versions).map((version, index) => (
                  <li
                    key={version.versionKey?.protocolKey! + index + 1}
                    css={spacing.bottom.small}
                  >
                    <button
                      onClick={() => onSelectVersion(version)}
                      type="button"
                      css={styles.versionToggle(
                        version.visibility === Visibility.VISIBILITY_PUBLIC,
                      )}
                    >
                      <p>{version.semanticVersion}</p>
                      {version.description && (
                        <span css={styles.versionDescription}>
                          {version.description}
                        </span>
                      )}
                      {version.visibility === Visibility.VISIBILITY_PRIVATE && (
                        <Badge
                          style="outline"
                          customCss={[
                            css`
                              margin-left: 10px;
                            `,
                          ]}
                        >
                          Private
                        </Badge>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return renderVersions();
};
