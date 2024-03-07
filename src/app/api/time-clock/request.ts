import { api, token, companyId } from '../api';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse } from 'axios';

export const useGetViewRequests = (
  { from, to }: { from?: Date; to?: Date } = {},
  options?: UseQueryOptions<AxiosResponse<any, any>>
) => {
  return useQuery<AxiosResponse<any, any>>(
    ['getViewRequests', { from, to }],
    async () =>
      await api.get('/v1/attendance/admin/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
          'company-id': companyId,
        },
        params: {
          from,
          to,
        },
      }),
    options
  );
};

export const usePostResponseRequest = (options: {
  onSuccess?: (data: any) => void;
}) => {
  return useMutation('usePostResponse',
    async ({ reqId, status }: { reqId: number; status: string }) =>
      await api.post(
        `/v1/attendance/admin/requests/${reqId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'company-id': companyId,
          },
        }
      ),
    {
      onSuccess: options.onSuccess,
    }
  );
};
