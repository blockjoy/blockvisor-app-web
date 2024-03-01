import { useRouter } from 'next/router';

export const useUpdateQueryString = (name: string) => {
  const router = useRouter();

  const updateQueryString = (page: number, search: string) => {
    const query: AdminQuery = { name };

    if (search?.length) query.search = search.trim();
    if (page) query.page = page;

    router.push({
      pathname: `/admin`,
      query,
    });
  };

  return { updateQueryString };
};
