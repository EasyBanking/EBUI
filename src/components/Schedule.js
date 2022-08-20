import React, { useState } from 'react';
import ScheduleModal from './ScheduleModal';

const Schedule = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='container mx-auto my-32 bg-white'>
      <h4
        className='w-64 bg-yellow-500 mx-auto px-4 py-3 font-bold text-center rounded my-5 cursor-pointer'
        onClick={handleShow}>
        Take a Schedule
      </h4>
      <div className='mx-auto flex justify-between flex-wrap px-4'>
        <div className='bg-violet-500 text-white w-64 p-4 my-2 rounded'>
          <div className='flex justify-between flex-wrap'>
            <p>Schedule</p>
            <div>num</div>
          </div>
          <div>Date</div>
          <div>Smart Village</div>
        </div>
        <div className='bg-violet-500 text-white w-64 p-4 my-2 rounded'>
          <div className='flex justify-between flex-wrap'>
            <p>Schedule</p>
            <div>num</div>
          </div>
          <div>Date</div>
          <div>Smart Village</div>
        </div>
        <div className='bg-violet-500 text-white w-64 p-4 my-2 rounded'>
          <div className='flex justify-between flex-wrap'>
            <p>Schedule</p>
            <div>num</div>
          </div>
          <div>Date</div>
          <div>Smart Village</div>
        </div>
      </div>
      <ScheduleModal handleClose={handleClose} show={show} />
    </div>
  );
};

export default Schedule;
