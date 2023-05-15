import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentCalendar = () => {
  const [ selectedDate, setSelectedDate ] = useState("");
  const [ selectedTime, setSelectedTime ] = useState("");

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    let newAppointment = new Date(selectedDate)
    newAppointment.setHours(parseInt(time.slice(0, 2)));
    newAppointment.setMinutes(parseInt(time.slice(3, 5)));
    console.log(newAppointment);
  };

  useEffect(() => {
    if (selectedTime) {
    }
  }, [ selectedTime ])

  const renderAvailableTimes = () => {
    // let startTime = new Date(selectedDate);
    // startTime.setHours(9, 0, 0); // Start at 9:00 AM
    // const endTime = new Date(selectedDate);
    // endTime.setHours(18, 0, 0); // End at 6:00 PM

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
        <button className='btn btn-secondary m-2 disabled' key={ time } onClick={ () => handleTimeSelect(time) }>
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
    <div className='d-flex flex-wrap justify-content-center gap-4'>
      <Calendar className="m-2 col-lg-4"
        value={ selectedDate }
        onChange={ handleDateSelect }
        minDate={ new Date() }
        maxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Show one month forward
      />
      { selectedDate && (
        <div className='m-2 col-md-6'>
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
  );
};

export default AppointmentCalendar;
