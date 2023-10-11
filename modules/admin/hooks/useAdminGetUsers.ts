import { useRecoilState } from 'recoil';
import { adminAtoms } from '@modules/admin';
import { userClient } from '@modules/grpc';

export const useAdminGetUsers = () => {
  const [users, setUsers] = useRecoilState(adminAtoms.users);

  const getUsers = async (searchTerm: string) => {
    const response = await userClient.listUsers(searchTerm);
    setUsers(response);
  };

  return {
    users,
    getUsers,
  };
};
