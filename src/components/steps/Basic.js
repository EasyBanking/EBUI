import { useStepperContext } from '../../contexts/StepperContext';

export default function Basic() {
  const { userData, setUserData } = useStepperContext();

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
      <div className='mx-2 w-full flex-1'>
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
      </div>
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
    </div>
  );
}
