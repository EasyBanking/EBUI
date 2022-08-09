import React from 'react';

const Schedule = () => {
  return (
    <div className='container mx-auto my-32 bg-white'>
      <h2 className='w-48 bg-yellow-500 mx-auto px-4 py-2 font-bold text-center rounded my-3'>
        Take a Schedule
      </h2>
      <div className='mx-auto flex justify-between flex-wrap px-4'>
        <div className='bg-violet-500 text-white w-64 p-2 my-2 rounded'>
          <div className='flex justify-between flex-wrap'>
            <p>Schedule</p>
            <div>num</div>
          </div>
          <div>Date</div>
          <div>Smart Village</div>
        </div>
        <div className='bg-violet-500 text-white w-64 p-2 my-2 rounded'>
          <div className='flex justify-between flex-wrap'>
            <p>Schedule</p>
            <div>num</div>
          </div>
          <div>Date</div>
          <div>Smart Village</div>
        </div>
        <div className='bg-violet-500 text-white w-64 p-2 my-2 rounded'>
          <div className='flex justify-between flex-wrap'>
            <p>Schedule</p>
            <div>num</div>
          </div>
          <div>Date</div>
          <div>Smart Village</div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
