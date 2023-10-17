import { AdminCard } from '../AdminCard/AdminCard';
import { userClient } from '@modules/grpc';
import { useState, useEffect } from 'react';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import IconUser from '@public/assets/icons/common/Person.svg';

const columns = ['firstName', 'email'];

export const AdminUsers = () => {
  const [list, setList] = useState<User[]>([]);
  const [listTotal, setListTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [listPage, setListPage] = useState(0);

  const getTotal = async () => {
    const response = await userClient.listUsers();
    setTotal(response.userCount);
  };

  const getList = async (searchTerm?: string, page?: number) => {
    const response = await userClient.listUsers(
      searchTerm,
      page === 0 ? 0 : page! * 6,
    );
    setList(response.users);
    setListTotal(response.userCount);
  };

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
    await getList(search);
    setListPage(0);
  };

  const handlePageChanged = (offset: number) => {
    setListPage(offset);
    getList(searchTerm, offset);
  };

  useEffect(() => {
    getTotal();
    getList();
  }, []);

  return (
    <AdminCard
      name="Users"
      icon={<IconUser />}
      total={`${total}`}
      list={list}
      listTotal={listTotal}
      listPage={listPage}
      columns={columns}
      onSearch={handleSearch}
      onPageChanged={handlePageChanged}
    />
  );
};
