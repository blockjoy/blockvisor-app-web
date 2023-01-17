import { AppLayout } from '@modules/layout';
import { Profile as ProfileView } from '@modules/profile/components/Profile';

const Profile = () => <ProfileView />;

Profile.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Profile">{page}</AppLayout>;
};

export default Profile;
