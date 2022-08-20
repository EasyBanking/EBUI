import { useEffect, useState } from 'react';
import { useStepperContext } from '../../contexts/StepperContext';

export default function Basic({ handleClick, steps, currentStep }) {
  const { userData, setUserData } = useStepperContext();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setErrors(validate(userData));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.firstname) {
      errors.firstname = 'Cannot be blank';
    } else if (values.firstname.length < 2) {
      errors.firstname = 'First name must be more than 2 characters';
    }
    if (!values.lastname) {
      errors.lastname = 'Cannot be blank';
    } else if (values.lastname.length < 2) {
      errors.lastname = 'Last name must be more than 2 characters';
    }
    if (!values.dateofbirth) {
      errors.dateofbirth = 'Cannot be blank';
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
      <div className='mx-2 w-full flex-1'>
        <div className='mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500'>
          Firstname
        </div>
        <div className='my-2 flex rounded border border-gray-200 bg-white p-1'>
          <input
            onChange={handleChange}
            value={userData['firstname'] || ''}
            name='firstname'
            placeholder='Firstname'
            className='w-full appearance-none p-1 px-2 text-gray-800 outline-none'
          />
        </div>
      </div>
      {errors?.firstname}
      {/* <div className='mx-2 w-full flex-1'>
        <div className='mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500'>
          Middlename
        </div>
        <div className='my-2 flex rounded border border-gray-200 bg-white p-1'>
          <input
            onChange={handleChange}
            value={userData['middlename'] || ''}
            name='middlename'
            placeholder='Middlename'
            className='w-full appearance-none p-1 px-2 text-gray-800 outline-none'
          />
        </div>
      </div> */}
      <div className='mx-2 w-full flex-1'>
        <div className='mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500'>
          Lastname
        </div>
        <div className='my-2 flex rounded border border-gray-200 bg-white p-1'>
          <input
            onChange={handleChange}
            value={userData['lastname'] || ''}
            name='lastname'
            placeholder='Lastname'
            className='w-full appearance-none p-1 px-2 text-gray-800 outline-none'
          />
        </div>
      </div>
      {errors?.lastname}
      <div className='mx-2 w-full flex-1'>
        <div className='mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500'>
          date of birth
        </div>
        <div className='my-2 flex rounded border border-gray-200 bg-white p-1'>
          <input
            onChange={handleChange}
            value={userData['dateofbirth'] || ''}
            name='dateofbirth'
            placeholder='dateofbirth'
            type='date'
            className='w-full appearance-none p-1 px-2 text-gray-800 outline-none'
          />
        </div>
      </div>
      {errors?.dateofbirth}
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
