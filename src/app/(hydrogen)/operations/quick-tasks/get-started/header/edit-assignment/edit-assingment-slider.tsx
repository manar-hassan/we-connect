import GearIcon from '@/components/icons/gear-icon';
import NotificationIcon from '@/components/icons/notification';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { SubmitHandler, useWatch } from 'react-hook-form';
import { FormTypes, formSchema, defaultValues } from './types';
import Link from 'next/link';
import { QuestionMarkCus } from '@/app/(hydrogen)/shared/qestion-mark-tooltip';
import FirstStep from './first-step';
import Button from '@/app/(hydrogen)/shared/button';
import SecondStepGroups from './second-step/second-step-groups';
import ThirdStep from './third-step';
import FourthStep from './fourth-Step';
import SecondStepUsers from './second-step/second-step-users';
import SecondStep from './second-step/second-step';

export default function EditAssignmentSlider() {
  const [activeStep, setActiveStep] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    console.log(data);
  };
  const handleIncreaseStep = () => {
    setActiveStep(activeStep + 1);
  };
  const handleDecreaseStep = () => {
    setActiveStep(activeStep - 1);
    if (disableNext) {
      setDisableNext(false);
    }
  };
  return (
    <div className="flex h-full flex-col">
      <div className="relative flex items-center justify-center gap-2 border-b border-gray-2 py-7 text-gray-6">
        {activeStep === 0
          ? 'Publish by'
          : activeStep === 1
          ? 'Select from your list'
          : activeStep === 2
          ? 'Settings'
          : 'Summary'}
        <Link
          href=""
          className="absolute right-5 flex items-center gap-1 hover:underline"
        >
          <QuestionMarkCus /> Need Help?
        </Link>
      </div>

      <div className="grow overflow-auto">
        <Form<FormTypes>
          validationSchema={formSchema}
          onSubmit={onSubmit}
          className="mx-auto  @container"
          useFormProps={{
            mode: 'onChange',
            defaultValues,
          }}
          id="edit-assignment-form"
        >
          {({
            register,
            control,
            setValue,
            getValues,
            getFieldState,
            formState: { errors },
          }) => {
            return (
              <div className="flex items-center justify-center">
                {activeStep === 0 ? (
                  <FirstStep register={register} control={control} />
                ) : activeStep === 1 ? (
                  <SecondStep
                    setValue={setValue}
                    getValues={getValues}
                    setDisableNext={setDisableNext}
                    control={control}
                  />
                ) : activeStep === 2 ? (
                  <ThirdStep
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                ) : activeStep === 3 ? (
                  <FourthStep getValues={getValues} />
                ) : (
                  <></>
                )}
              </div>
            );
          }}
        </Form>
      </div>

      <div className="relative z-20 flex items-center justify-center  border-t border-gray-2 p-7">
        <Button
          onClick={handleDecreaseStep}
          type="button"
          className={cn('absolute left-5', activeStep === 0 && 'hidden')}
        >
          Back
        </Button>
        <div></div>
        {activeStep === 3 ? (
          <Button
            form="edit-assignment-form"
            type="submit"
            variant="secondary"
            className="absolute right-5"
          >
            Confirm
          </Button>
        ) : (
          <Button
            disabled={disableNext}
            onClick={handleIncreaseStep}
            type="button"
            variant="secondary"
            className="absolute right-5"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
