import {
  ChangeEvent,
  createRef,
  KeyboardEvent,
  RefObject,
  useEffect,
  useState,
} from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './NodeFirewallRuleTable.styles';
import {
  FirewallRule,
  IpName,
  PortName,
} from '@modules/grpc/library/blockjoy/common/v1/config';
import { useRecoilValue } from 'recoil';
import { nodeLauncherAtoms } from '@modules/node';
import IconDelete from '@public/assets/icons/common/Trash.svg';

type Props<T = any> = {
  type: T;
  property: 'ips' | 'ports';
  rows: T[];
  columns: string[];
  rule?: FirewallRule;
  onFirewallChanged: (nextFirewall: FirewallRule[]) => void;
};

export const NodeFirewallRuleTable = ({
  type,
  property,
  rows,
  columns,
  rule,
  onFirewallChanged,
}: Props) => {
  const rules = useRecoilValue(nodeLauncherAtoms.nodeLauncher)?.firewall;
  const propertyValue = property.substring(0, property.length - 1);
  const selectedList: typeof type[] = rule?.[property]!;

  const [inputRefs, setInputRefs] = useState<RefObject<HTMLInputElement>[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [state, setState] = useState<typeof type>();

  const handleAddClicked = () => {
    const nextSelectedList = [...selectedList];

    nextSelectedList.push({
      [propertyValue]:
        type === IpName ? state[propertyValue] : +state[propertyValue],
      name: state.name,
    });

    const nextRule = { ...rule!, [property]: nextSelectedList };
    const nextRules = rules.map((r) => (r.key === nextRule.key ? nextRule : r));
    onFirewallChanged(nextRules);
    inputRefs[0]?.current?.focus();
  };

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === IpName && e.target.name === propertyValue) {
      const pattern =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$/gm;
      const result = pattern.test(e.target.value);
      setIsValid(
        e.target.value === '' ||
          (result &&
            !rows.some((row) => row?.[propertyValue] === e.target.value)),
      );
      setState({ ...state, [e.target.name]: e.target.value });
    } else if (type === PortName && e.target.name === propertyValue) {
      const pattern = /^\d+$/;
      const result = pattern.test(e.target.value);
      setIsValid(
        e.target.value === '' ||
          (result &&
            !rows.some((row) => row?.[propertyValue] === +e.target.value)),
      );
      setState({ ...state, [e.target.name]: e.target.value });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const handleDelete = (key: string) => {
    const nextSelectedList = selectedList.filter(
      (l) => l[propertyValue] !== key,
    );

    const nextRule = { ...rule!, [property]: nextSelectedList };
    const nextRules = rules.map((r) => (r.key === nextRule.key ? nextRule : r));
    nextRules[property] = selectedList;
    onFirewallChanged(nextRules);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid) {
      handleAddClicked();
      inputRefs[0].current?.focus();
    }
  };

  useEffect(() => {
    setInputRefs(
      Array(columns.length)
        .fill(undefined, 0, columns.length - 1)
        .map((_, i) => createRef()),
    );
  }, [columns.length]);

  return (
    <table css={styles.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={column}>
              <input
                ref={inputRefs[index]}
                name={column}
                css={[
                  styles.input,
                  Boolean(state?.[propertyValue]) &&
                    !isValid &&
                    column === propertyValue &&
                    styles.inputInvalid,
                ]}
                type="text"
                placeholder={column}
                onInput={handleInputChanged}
                onKeyUp={handleKeyUp}
              />
            </th>
          ))}
          <th>
            <button
              disabled={!isValid || !state?.[propertyValue].length}
              onClick={handleAddClicked}
              css={styles.addRowButton}
            >
              Add
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[propertyValue]}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
            <td>
              <button
                className="delete-button"
                onClick={() => handleDelete(row[propertyValue])}
                css={styles.deleteRowButton}
              >
                <SvgIcon size="13px">
                  <IconDelete />
                </SvgIcon>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
