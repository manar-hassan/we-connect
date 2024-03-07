'use client';
import { useState } from 'react';
import { Modal, Stepper, Step } from 'rizzui';
import Button from '../shared/button';
import FirstForm from './first-form';
import ArrowLeft from '@/components/icons/arrow-left';
import SecondForm from './second-form';
import { Form } from '@/components/ui/form';
import { defaultValues, formsType, formsSchema } from './signup-form';
import { SubmitHandler, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';
import ThirdForm from './third-form';
import FourthForm from './fourth-form';
import FifthForm from './fifth-form';
import cn from '@/utils/class-names';
import { useSecondSignup } from '@/app/api/second-signup/second-signup';


export default function SignUpModal({ companyId }: { companyId : number}) {
  const [modalState, setModalState] = useState({
    isOpen: true,
    size: 'lg',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const SecondSignup = useSecondSignup();

  const onSubmit: SubmitHandler<formsType> = (data) => {
    /*     setModalState((prevState) => ({
      ...prevState,
      isOpen: false,
    })); */
    setCurrentStep(0);

    const features: any = [];

    data.operations &&
      Object.entries(data.operations)
        .filter(([_, value]) => value === true)
        .map(([key]) => features.push(key));
    data.hr &&
      Object.entries(data.hr)
        .filter(([_, value]) => value === true)
        .map(([key]) => features.push(key));
    data.communication &&
      Object.entries(data.communication)
        .filter(([_, value]) => value === true)
        .map(([key]) => features.push(key));


    /*     SecondSignup.mutate(
      {
        companyId: companyId,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        logo: data.logo,
        employees: data.employees,
        businessIndustry: data.businessIndustry,
        features,
        mobile: data.phoneNumber,
        phoneCode: data.countryCode,
      },
      {
        onSuccess: (res) => {
          console.log('success');
        },
      }
    ); */
  };
  const handleOnCLick = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
    }
  };

  return (
    <>
      <Button
        onClick={() =>
          setModalState((prevState) => ({
            ...prevState,
            isOpen: true,
            size: 'lg',
          }))
        }
      >
        Open Modal
      </Button>
      <Modal
        isOpen={modalState.isOpen}
        //@ts-ignore
        size={modalState.size}
        className="[&_div_div.pointer-events-none]:overflow-visible"
        onClose={() =>
          setModalState((prevState) => ({ ...prevState, isOpen: false }))
        }
      >
        <div className="relative m-auto w-full pb-5 pt-7">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="absolute left-7 top-7 flex items-center gap-3 text-[#7c8487]"
            >
              <ArrowLeft fill="#7c8487" /> Back
            </button>
          )}
          <div className=" flex w-full flex-col items-center justify-center ">
            <div className="mb-7">
              {/* [&_>div>.rizzui-step-circle]:bg-blue-6 [&_>div>.rizzui-step-container>span>span]:bg-blue-6 */}
              <Stepper
                contentClassName="ml-0"
                className="w-[300px]  [&_>div]:!mx-[5px] [&_>div]:items-center"
                currentIndex={currentStep}
              >
                <Step
                  className="omar"
                  circleClassName="omar"
                  size="sm"
                  title=""
                />
                <Step
                  circleClassName="rotate-45"
                  contentClassName="rotate-45"
                  size="sm"
                  title=""
                />
                <Step size="sm" title="" />
                <Step size="sm" title="" />
                <Step circleClassName="text-red-500" size="sm" title="" />
              </Stepper>
            </div>

            <Form<formsType>
              /*               validationSchema={formsSchema}
               */ onSubmit={onSubmit}
              className="w-full"
              useFormProps={{
                mode: 'onChange',
                defaultValues,
              }}
            >
              {({
                register,
                control,
                setValue,
                getValues,
                formState: { errors },
              }) => {
                const Watch = (name: keyof formsType) =>
                  useWatch({
                    control,
                    name,
                  });

                console.log('Watch logo:', Watch('logo'));

                return (
                  <motion.div className=" w-full">
                    {currentStep === 0 ? (
                      <FirstForm
                        errors={errors}
                        Watch={Watch}
                        register={register}
                      />
                    ) : currentStep === 1 ? (
                      <SecondForm setValue={setValue} />
                    ) : currentStep === 2 ? (
                      <ThirdForm register={register} />
                    ) : currentStep === 3 ? (
                      <FourthForm
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                      />
                    ) : currentStep === 4 ? (
                      <FifthForm control={control} setValue={setValue} />
                    ) : (
                      <></>
                    )}
                    <div className="flex w-full items-center justify-center border-t border-gray-2 pt-5">
                      <Button
                        onClick={handleOnCLick}
                        type="button"
                        variant="secondary"
                        className={cn(currentStep === 4 && 'hidden')}
                      >
                        Next step
                      </Button>
                      <Button
                        className={cn('block', currentStep < 4 && 'hidden')}
                        type="submit"
                        variant="secondary"
                      >
                        Access dashboard
                      </Button>
                    </div>
                  </motion.div>
                );
              }}
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
