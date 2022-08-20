import { useStepperContext } from '../../contexts/StepperContext';

import { useEffect, useState } from 'react';

export default function Security({ handleClick, steps, currentStep }) {
  const { userData, setUserData } = useStepperContext();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    setErrors(validate(userData));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = 'Cannot be blank';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid email format';
    }
    if (!values.password) {
      errors.password = 'Cannot be blank';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    }
    return errors;
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmit();
      handleClick('next');
    }
  }, [errors]);
  return (
    <div className='flex flex-col '>
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Email
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['email'] || ''}
            name='email'
            placeholder='Email'
            type='email'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>
      {errors?.email}
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Password
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['password'] || ''}
            name='password'
            placeholder='Password'
            type='password'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>
      {errors?.password}
      {/* <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Mobile Number
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['mobilenumber'] || ''}
            name='mobilenumber'
            placeholder='Mobile Number'
            type='tel'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div> */}
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
