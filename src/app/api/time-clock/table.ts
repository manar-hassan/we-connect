import { api, token, companyId } from '../api';
import { useQuery } from 'react-query';

export const useGetTable = (page: string) => {
  return useQuery('getTableToday', () =>
    api.get(`/v1/attendance/admin/${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'company-id': companyId,
      },
    })
  );
};
