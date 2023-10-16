import { userClient } from '@modules/grpc';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { useEffect, useRef, useState } from 'react';

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const searchTerm = useRef('');

  const getUsers = async (searchTerm: string) => {
    const response = await userClient.listUsers(searchTerm);
    setUsers(response);
  };

  useEffect(() => {
    getUsers(searchTerm.current);
  }, []);

  return (
    <>
      Users
      <ul>
        {users?.map((user) => (
          <li>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </>
  );
};
