import axios from 'axios';
import { useMutation } from 'react-query';
import { IError, secondSignupVariables, secondSignupResponse } from './types';

const API_BASE_URL = 'https://weconnect.stackdeans.xyz/api';

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const useSecondSignup = () => {
  return useMutation<secondSignupResponse, IError, secondSignupVariables>(
    ({
      companyId,
      companyName,
      jobTitle,
      employees,
      businessIndustry,
      features,
      logo,
      mobile,
      phoneCode,
    }) =>
      authApi.post('/v1/auth/secondSignup', {
        company_id: companyId,
        company_name: companyName,
        job_title: jobTitle,
        number_employee: employees,
        business_industry: businessIndustry,
        features,
        logo,
        mobile,
        country: phoneCode,
      })
  );
};
