import { useAdminGetUsers } from '@modules/admin';
import { useEffect, useRef } from 'react';

export const AdminUsers = () => {
  const { users, getUsers } = useAdminGetUsers();
  const searchTerm = useRef('');

  useEffect(() => {
    getUsers(searchTerm.current);
  }, []);

  return (
    <ul>
      {users?.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  );
};
