import { AxiosResponse } from 'axios';
import { api, token, companyId } from '../api';
import { UseQueryOptions, useQuery } from 'react-query';

export const useGetJobs = (options?: UseQueryOptions<AxiosResponse<any>>) => {
  return useQuery(
    'getJobs',
    () =>
      api.get('/v1/projects/list', {
        headers: {
          Authorization: `Bearer ${token}`,
          'company-id': companyId,
        },
      }),
    {
      onSuccess: options?.onSuccess, 
    }
  );
};
