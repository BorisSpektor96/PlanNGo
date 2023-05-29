import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from '../UI/Modal';

const AppointmentCalendar = (props) => {
  const [ selectedDate, setSelectedDate ] = useState("");
  const [ selectedTime, setSelectedTime ] = useState("");
  const [ Schedule, setSchedule ] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setSchedule(true)
  };

  const scheduleHandler = () => {
    let newAppointment = new Date(selectedDate)
    newAppointment.setHours(parseInt(selectedTime.slice(0, 2)));
    newAppointment.setMinutes(parseInt(selectedTime.slice(3, 5)));
    console.log(newAppointment);
  }

  useEffect(() => {
    if (selectedTime) {
    }
  }, [ selectedTime ])

  const renderAvailableTimes = () => {

    const timeList = [
      { time: "09:00", isTaken: false },
      { time: "09:30", isTaken: true },
      { time: "10:00", isTaken: false },
      { time: "10:30", isTaken: false },
      { time: "11:00", isTaken: false },
      { time: "11:30", isTaken: true },
      { time: "12:00", isTaken: false },
      { time: "12:30", isTaken: false },
      { time: "13:00", isTaken: true },
      { time: "13:30", isTaken: false },
      { time: "14:00", isTaken: false },
      { time: "14:30", isTaken: false },
      { time: "15:30", isTaken: true },
      { time: "16:00", isTaken: false },
      { time: "16:30", isTaken: false },
      { time: "17:00", isTaken: false },
      { time: "17:30", isTaken: false },

    ]

    let availableTimes = timeList.map(({ time, isTaken }) => {
      if (!isTaken) {
        return (
          <button className='btn btn-primary m-2' key={ time } onClick={ () => handleTimeSelect(time) }>
            { time }
          </button>
        )
      }
      return (
        <button className='btn btn-secondary m-2 disabled' key={ time }>
          { time }
        </button>
      )
    })

    // If no times are available, display a message indicating that there are no available times.
    if (availableTimes.length === 0) {
      return <p>No available times on this day.</p>;
    }

    return <div className='d-flex justify-content-center flex-wrap'>{ availableTimes }</div>;
  };


  return (
    <Modal onClose={ props.onClose }>
      <div class="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          dal
          onClick={ props.onClose }
        ></button>
      </div>
      <div className='d-flex flex-wrap justify-content-center gap-4'>
        <Calendar className="m-2"
          value={ selectedDate }
          onChange={ handleDateSelect }
          minDate={ new Date() }
          maxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Show one month forward
        />
        { selectedDate && (
          <div className='m-2'>
            <p className='d-flex justify-content-center fs-5 text-dark badge bg-warning'>Available times for { selectedDate.toLocaleDateString() }:</p>
            { renderAvailableTimes() }
            { !selectedTime && <p className='d-flex justify-content-center fs-6 badge bg-danger'>Please select a time.</p> }
            { selectedTime && (
              <p className='d-flex justify-content-center fs-6 badge bg-success'>
                You have selected { selectedDate.toLocaleDateString() } at{ ' ' }
                { selectedTime }.
              </p>
            ) }
          </div>
        ) }
      </div>
      <div className='d-flex justify-content-center'>
        <button className={ !Schedule ? "btn btn-primary disabled" : 'btn btn-primary' } onClick={ () => scheduleHandler() }>Schedule</button>
      </div>
    </Modal>

  );
};

export default AppointmentCalendar;
