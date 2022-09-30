import { Button } from '../shared/components/Button/Button';

export default {
  title: 'Components',
  component: Button,
};

export const ButtonComponent = () => {
  return (
    <div style={{ maxWidth: '300px' }}>
      <Button size="medium" display="block" style="primary" type="submit">
        Login
      </Button>
    </div>
  );
};
