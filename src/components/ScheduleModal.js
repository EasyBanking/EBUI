import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ScheduleModal(props) {
  const { userData, setUserData } = useState({});
  const [date, setDate] = useState(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Location</Form.Label>
              <Form.Control as='select' value={''} onChange={handleChange}>
                {/* {data.map((opt) => (
                  <option value={opt.value}>{opt.value}</option>
                ))} */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='duedate'>
              <Form.Control
                type='date'
                name='duedate'
                placeholder='Due date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='text-slate-400 bg-white border-2 border-slate-300 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white'
            onClick={props.handleClose}>
            Close
          </Button>
          <Button
            onClick={props.handleClose}
            className='cursor-pointer rounded-lg bg-violet-500 py-2 border-2 border-slate-300 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white'>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ScheduleModal;
