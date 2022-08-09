import { useStepperContext } from '../../contexts/StepperContext';

export default function Work() {
  const { userData, setUserData } = useStepperContext();

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
    </div>
  );
}
