import { AppLayout } from "@modules/layout";

const Profile = () => {
  return (
    <div>
      <main>Profile index page</main>
    </div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>
}
