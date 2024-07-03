import { Admin } from '@modules/admin/Admin';
import { ProtectedRoute } from '@modules/auth';
import { MasterLayout } from '@modules/layout';

const Component = () => (
  <MasterLayout>
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  </MasterLayout>
);

export default Component;
