import React from 'react';
import SecondStepGroups from './second-step-groups';
import SecondStepUsers from './second-step-users';
import { useWatch } from 'react-hook-form';

export default function SecondStep({
  getValues,
  setValue,
  setDisableNext,
  control,
}: any) {
  const watchHowPublish = useWatch({
    control,
    name: 'howPublish',
  });
  return (
    <>
      {watchHowPublish === 'smart groups' ? (
        <SecondStepGroups
          setValue={setValue}
          getValues={getValues}
          setDisableNext={setDisableNext}
        />
      ) : (
        <SecondStepUsers
          setValue={setValue}
          getValues={getValues}
          setDisableNext={setDisableNext}
        />
      )}
    </>
  );
}
