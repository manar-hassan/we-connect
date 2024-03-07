import { AxiosResponse } from 'axios';
import { api, token, companyId } from '../api';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetTimesheetJobs = (
  {
    from,
    to,
    project,
  }: {
    from?: Date;
    to?: Date;
    project?: number;
  } = {},
  options?: Omit<
    UseQueryOptions<AxiosResponse<any, any>, unknown, AxiosResponse<any, any>>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['getTimesheetJobs', { from, to, project }],
    async () =>
      await api.get('/v1/attendance/admin/jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
          'company-id': companyId,
        },
        params: {
          from,
          to,
          project,
        },
      }),
    options
  );
};
