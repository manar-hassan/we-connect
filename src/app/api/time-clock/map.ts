import { api, token, companyId } from '../api';
import { useQuery } from 'react-query';

export const useGetMap = ({ date }: { date: string | undefined }) => {
  return useQuery(
    ['getMap', { date }],
    async () =>
      await api.get('/v1/attendance/admin/map', {
        headers: {
          Authorization: `Bearer ${token}`,
          'company-id': companyId,
        },
        params: {
          date,
        },
      })
  );
};
