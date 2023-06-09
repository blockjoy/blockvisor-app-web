import { ButtonWithDropdown, DropdownItem } from '@shared/components';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconDoor from '@public/assets/icons/common/Door.svg';
import { ComponentStory } from '@storybook/react';
import { reset } from 'styles/utils.reset.styles';
import { divider } from 'styles/utils.spacing.styles';

export default {
  title: 'Components/ButtonWithDropdown',
  component: ButtonWithDropdown,
};

const Template: ComponentStory<typeof ButtonWithDropdown> = (args) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ButtonWithDropdown {...args}>
        <ul css={[reset.list]}>
          <li>
            <DropdownItem href="/">
              <IconCog />
              Settings
            </DropdownItem>
          </li>
          <li css={[divider]}>
            <DropdownItem onButtonClick={() => console.log()}>
              <IconDoor />
              Logout
            </DropdownItem>
          </li>
        </ul>
      </ButtonWithDropdown>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  button: <button>FG</button>,
};
