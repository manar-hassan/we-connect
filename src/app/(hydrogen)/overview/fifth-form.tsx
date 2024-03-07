import PhoneImage from '@/components/icons/phone-image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function FifthForm({ control, setValue }: any) {
  return (
    <div className="mb-7 flex flex-col items-center">
      <div>
        <PhoneImage />
      </div>
      <div className="mt-5 text-xl">What&apos;s your mobile number?</div>
      <p className="mt-2.5 w-[340px] text-center opacity-70">
        Log in to your app easily and securely with your mobile phone number
      </p>
      {/*       <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { value, onChange } }) => (
          <PhoneNumber
            className="mt-5 h-11"
            country="eg"
            rounded="lg"
            value={value}
            onChange={onChange}
            enableSearch
          />
        )}
      /> */}

      <div className="mt-5">
        <PhoneInput
          enableSearch={true}
          country={'eg'}
          enableAreaCodes={true}
          autoFormat={false}
          inputProps={{
            type: 'text',
            required: true,
            autoFocus: true,
            className:
              'h-12 w-[300px] flex items-center rounded-lg border border-gray-4 pl-14 pr-3 focus:border focus:border-blue-6 focus:outline-none focus:ring-transparent ',
          }}
          onChange={(phone, country: { dialCode: string }) => {
            setValue('phoneNumber', phone.slice(country.dialCode.length));
            setValue('countryCode', country.dialCode);
          }}
        />
      </div>
      <p className="mt-2.5 w-[340px] text-center opacity-70">
        We&apos;ll text you the link to download your mobile app
      </p>
    </div>
  );
}
