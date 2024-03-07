export interface IError {
  response: {
    data: {
      message: string;
    };
  };
}

export interface secondSignupResponse {
  data: {
    data: {};
  };
}

export interface secondSignupVariables {
  companyId: string | undefined;
  companyName: string | undefined;
  jobTitle: string | undefined;
  employees: string | undefined;
  businessIndustry: string | undefined;
  features: string[] | undefined;
  logo: File[] | undefined;
  mobile: string | undefined;
  phoneCode: string | undefined;
}
