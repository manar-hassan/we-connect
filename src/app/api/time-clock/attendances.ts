import { api, token, companyId } from '../api';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';

export const useGetAttendances = ({
  from,
  to,
  userId,
}: {
  userId: number;
  from: Date;
  to: Date;
}) => {
  return useQuery<AxiosResponse<any, any>>(
    ['getRowTableSlider', { from, to, userId }],
    async () =>
      await api.get(`/v1/attendance/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'company-id': companyId,
        },
        params: {
          from,
          to,
        },
      })
  );
};

export const usePostAttendance = (options: {
  onSuccess?: (data: any) => void;
}) => {
  return useMutation(
    async ({
      clockIn,
      projectId,
      from,
      to,
      userId,
    }: {
      clockIn: string;
      projectId: number;
      from: string;
      to: string;
      userId: number;
    }) =>
      await api.post(
        `/v1/attendance/admin/store/${userId}`,
        {
          clockin: clockIn,
          project_id: projectId,
          from,
          to,
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

export const useDeleteAttendance = (options: {
  onSuccess?: (data: any) => void;
}) => {
  return useMutation(
    async ({
      from,
      to,
      attendancesId,
    }: {
      from: string;
      to: string;
      attendancesId: { id: number }[];
    }) =>
      await api.post(
        `/v1/attendance/admin/delete`,
        {
          _method: 'delete',
          ids: attendancesId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'company-id': companyId,
          },
          params: {
            from,
            to,
          },
        }
      ),
    {
      onSuccess: options.onSuccess,
    }
  );
};

export const useEditAttendance = (options: {
  onSuccess?: (data: any) => void;
}) => {
  return useMutation(
    async ({
      clockIn,
      projectId,
      from,
      to,
      attendanceId,
      clockOut,
      note,
      adminNote,
    }: {
      clockIn: string;
      projectId: number;
      from: string;
      to: string;
      attendanceId: number;
      clockOut: string;
      note: string;
      adminNote: string;
    }) =>
      await api.post(
        `/v1/attendance/admin/edit/${attendanceId}`,
        {
          from,
          to,
          clockin: clockIn,
          project_id: projectId,
          clockout: clockOut,
          note,
          admin_note: adminNote,
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
