import { api, token, companyId } from '../api';
import { useQuery } from 'react-query';

export const useGetSettings = () => {
  return useQuery(
    'getSettings',
    async () =>
      await api.get('/v1/attendance/client/settings', {
        headers: {
          Authorization: `Bearer ${token}`,
          'company-id': companyId,
        },
      })
  );
};
