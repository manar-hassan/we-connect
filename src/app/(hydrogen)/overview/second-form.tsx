'use client';

import { AdvancedRadio, RadioGroup } from 'rizzui';
import { Fragment, useEffect, useState } from 'react';
import CheckedIcon from '@/components/icons/checked';
import { motion } from 'framer-motion';
import CleaningIcon from '@/components/icons/cleaning';
import SecurityIcon from '@/components/icons/security';
import HealthcareIcon from '@/components/icons/healthcare';
import ManufactureIcon from '@/components/icons/manufacture';
import ConstructionIcon from '@/components/icons/construction';
import RetailIcon from '@/components/icons/retail';
import FoodBeverageIcon from '@/components/icons/food-beverage';
import HospitalityIcon from '@/components/icons/hospitality';
import PlusProIcon from '@/components/icons/plus-pro';
import cn from '@/utils/class-names';
import CheckedSecIcon from '@/components/icons/checked-sec';

export default function SecondForm({ setValue }: any) {
  const employees = [
    '1-10',
    '11-30',
    '31-50',
    '51-100',
    '101-200',
    '201-500',
    '501-1000',
    '1000+',
  ];

  const industries = [
    {
      icon: <CleaningIcon />,
      name: 'Cleaning',
    },
    {
      icon: <SecurityIcon />,
      name: 'Security',
    },
    {
      icon: <HealthcareIcon />,
      name: 'Healthcare',
    },
    {
      icon: <ManufactureIcon />,
      name: 'Manufacturing',
    },
    {
      icon: <ConstructionIcon />,
      name: 'Construction',
    },
    {
      icon: <RetailIcon />,
      name: 'Retail',
    },
    {
      icon: <FoodBeverageIcon />,
      name: 'Food & Beverage',
    },
    {
      icon: <HospitalityIcon />,
      name: 'Hospitality',
    },
    {
      name: 'Transportation',
    },
    {
      name: 'Events',
    },
    {
      name: 'Staffing',
    },
    {
      name: 'Real estate',
    },
    {
      name: 'Entertainment',
    },
    {
      name: 'Field Services',
    },
    {
      name: 'Beauty & spa',
    },
    {
      name: 'Gardening',
    },
    {
      name: 'Fitness',
    },
    {
      name: 'Logistics',
    },
    {
      name: 'Education',
    },
    {
      name: 'Religious',
    },
    {
      name: 'Governmental',
    },
    {
      name: 'Telecom',
    },
    {
      name: 'NPO',
    },
    {
      name: 'Other',
    },
  ];

  const [empValue, setEmpValue] = useState('');
  const [indValue, setIndValue] = useState('');
  const [showOtherIndustries, setShowOtherIndustries] = useState(false);

  useEffect(() => {
    setValue('employees', empValue);
  }, [empValue, setValue]);

  useEffect(() => {
    setValue('businessIndustry', indValue);
  }, [indValue, setValue]);

  return (
    <div className="flex flex-col gap-7 items-center justify-center">
      <div className="text-base font-bold ">
        How many employees do you have? <span className="text-red-700">*</span>
      </div>
      <RadioGroup
        value={empValue}
        setValue={setEmpValue}
        className="grid w-full grid-cols-4 gap-2.5 px-8"
      >
        {employees.map((item) => (
          <AdvancedRadio
            key={item}
            name="employees"
            value={item}
            inputClassName=" peer "
            className="flex h-[50px] cursor-pointer items-center justify-center rounded-xl border border-transparent p-2.5 shadow-[0_2px_10px_0_rgba(0,0,0,.07)] transition duration-100 peer-checked:border-blue-6"
          >
            <span className="flex items-center justify-center gap-3">
              {item}{' '}
              {empValue === item && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckedIcon />
                </motion.span>
              )}
            </span>
          </AdvancedRadio>
        ))}
      </RadioGroup>
      <div className="text-base font-bold ">
        What is your business industry?
        <span className="text-red-700">*</span>
      </div>
      <RadioGroup
        value={indValue}
        setValue={setIndValue}
        className="grid w-full grid-cols-4 gap-x-6 gap-y-2.5 px-8"
      >
        {industries.map((industry) => (
          <Fragment key={industry.name}>
            {industry.icon && (
              <AdvancedRadio
                name="industries"
                value={industry.name}
                onClick={() => setIndValue(industry.name)}
                inputClassName=" peer "
                className="relative flex h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent p-2.5 pb-0 shadow-[0_2px_10px_0_rgba(0,0,0,.07)]  transition duration-100 peer-checked:border-blue-6"
              >
                {industry.icon}
                <span className="flex items-center justify-center gap-3 whitespace-nowrap text-[13px]">
                  {industry.name}
                </span>
                {indValue === industry.name && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-1 top-1"
                  >
                    <CheckedIcon />
                  </motion.span>
                )}
              </AdvancedRadio>
            )}
            <div className="contents"></div>
          </Fragment>
        ))}

        <div
          onClick={() => setShowOtherIndustries(true)}
          className={cn(
            'col-span-4 flex h-14 cursor-pointer items-center justify-center gap-3 shadow-[0_2px_10px_0_rgba(0,0,0,.07)]',
            showOtherIndustries && 'hidden'
          )}
        >
          <PlusProIcon /> Other industries
        </div>
      </RadioGroup>

      <motion.div
        animate={{
          height: showOtherIndustries ? 'auto' : '0',
        }}
        className="h-0 w-full overflow-hidden px-8"
      >
        <RadioGroup
          value={indValue}
          setValue={setIndValue}
          className="grid w-full grid-cols-4 gap-x-8 gap-y-2.5"
        >
          {industries.map((industry) => (
            <Fragment key={industry.name}>
              {!industry.icon && (
                <AdvancedRadio
                  name="industries"
                  value={industry.name}
                  onClick={() => setIndValue(industry.name)}
                  inputClassName=" peer "
                  className="relative flex h-[35px]  cursor-pointer items-center justify-evenly rounded-full border border-transparent bg-[#f5f8fb] p-2.5 pb-0  transition duration-100 peer-checked:border-blue-6"
                >
                  <span
                    className={cn(
                      '  items-center justify-center gap-3  whitespace-nowrap text-[13px]',
                      indValue === industry.name && 'max-w-[74px] truncate'
                    )}
                  >
                    {industry.name}
                  </span>
                  {indValue === industry.name && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckedSecIcon />
                    </motion.span>
                  )}
                </AdvancedRadio>
              )}{' '}
            </Fragment>
          ))}
        </RadioGroup>
      </motion.div>
    </div>
  );
}
