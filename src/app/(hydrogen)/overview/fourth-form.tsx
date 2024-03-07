import UploadZone from '@/components/ui/file-upload/upload-zone';
import React, { useState } from 'react';

export default function FourthForm({ getValues, setValue, register }: any) {
  const [file, setFile] = useState();
  console.log(getValues('logo'));
  return (
    <div className="mb-7 flex flex-col items-center justify-center text-center">
      <div className="text-xl">Make it your own</div>
      <p className="mt-5">Insert your logo</p>
      <div className="mt-2.5">
        {/*         <UploadZone
          name="logo"
          getValues={getValues}
          setValue={setValue}
          className="w-[450px] "
          register={register}
          sendFormDirectly={true}
                    error={errors?.portfolios?.message as string}
           
        /> */}

        <input
          name="logo"
          {...register('logo', {
            setValueAs: (files: any) => files,
          })}
          className="mb-5 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none "
          type="file"
        />
      </div>
      <div className="mt-2.5 opacity-50">
        Change from the settings menu at any time
      </div>
    </div>
  );
}
