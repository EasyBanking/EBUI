import { useEffect, useState } from 'react';
import { useStepperContext } from '../../contexts/StepperContext';

export default function Work({ handleClick, steps, currentStep }) {
  const { userData, setUserData } = useStepperContext();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setErrors(validate(userData));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.profession) {
      errors.profession = 'Cannot be blank';
    } else if (values.profession.length < 2) {
      errors.profession = 'profession must be more than 2 characters';
    }
    if (!values.workplace) {
      errors.workplace = 'Cannot be blank';
    } else if (values.workplace.length < 2) {
      errors.workplace = 'Work place must be more than 2 characters';
    }

    return errors;
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmit();
      handleClick('next');
    }
  }, [errors]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className='flex flex-col '>
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Profession
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['profession'] || ''}
            name='profession'
            placeholder='Profession'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>
      {errors?.profession}
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Work place
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['workplace'] || ''}
            name='workplace'
            placeholder='work place'
            type='text'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>
      {errors?.workplace}
      <div className='container mt-4 mb-8 flex justify-around'>
        <button
          onClick={() => handleClick()}
          className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
            currentStep === 1 ? ' cursor-not-allowed opacity-50 ' : ''
          }`}>
          Back
        </button>

        <button
          onClick={() => handleSubmit()}
          className='cursor-pointer rounded-lg bg-violet-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white'>
          {currentStep === steps.length - 1 ? 'Confirm' : 'Next'}
        </button>
      </div>
    </div>
  );
}
