import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from '../UI/Modal';

const AppointmentCalendar = (props) => {
  const [ selectedDate, setSelectedDate ] = useState("");
  const [ selectedTime, setSelectedTime ] = useState("");
  const [ showCalendar, setShowCalendar ] = useState(false)
  const [ selectedService, setSelectedService ] = useState(null);
  const [ Schedule, setSchedule ] = useState(false);

  const [ timeList, setTimeList ] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const setServiceAndShowCalendar = (service) => {
    setSelectedService(service)
    setShowCalendar(!showCalendar)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const scheduleHandler = () => {
    let newAppointment = {
      date: new Date(selectedDate),
      service: selectedService
    }
    newAppointment.date.setHours(parseInt(selectedTime.slice(0, 2)));
    newAppointment.date.setMinutes(parseInt(selectedTime.slice(3, 5)));
    console.log(newAppointment);
  }

  useEffect(() => {
    if (selectedDate !== "" && selectedService !== null && selectedTime !== "") {
      setSchedule(true)
    } else {
      setSchedule(false)
    }
  }, [ selectedTime, selectedService, selectedDate ])

  const timeToString = (timeString) => {
    const [ hours, minutes ] = timeString.split(":").map(Number)
    const time = new Date()
    time.setHours(hours, minutes, 0);
    return time
  }

  useEffect(() => {
    if (selectedService !== null) {
      const start = timeToString(props.workingHours.start)
      const end = timeToString(props.workingHours.end)
      // timeList = timeList.filter((time) => (
      //   time.time > props.workingHours.start
      //   &&
      //   time.time < props.workingHours.end
      // ))
      // let time = {}
      let minutes = (selectedService.duration * 60)
      let hours = 60 % minutes
      const serviceDuration = (((timeToString(`${hours}:${minutes}`)).getHours()) * 60) + ((timeToString(`${hours}:${minutes}`)).getMinutes())

      // console.log("serviceDuration", serviceDuration)
      let filteredList = []

      for (let i = start; i.getTime() < end.getTime(); i = new Date(i.getTime() + 60000 * serviceDuration)) {
        const time = { time: i, isTaken: false }
        filteredList.push(time)
      }
      console.log(filteredList)

      filteredList = filteredList.filter((time) => (
        time.time > new Date(10, 0, 0) && time.time < new Date(14, 0, 0)
        // time.time > props.workingHours.start &&
        // time.time < props.workingHours.end
      ))
      console.log(filteredList)
      setTimeList(filteredList)
    }
  }, [ selectedService ])


  useEffect(() => {
    // setTimeList([
    //   { time: "06:00", isTaken: false },
    //   { time: "09:00", isTaken: false },
    //   { time: "09:30", isTaken: true },
    //   { time: "10:00", isTaken: false },
    //   { time: "10:30", isTaken: false },
    //   { time: "11:00", isTaken: false },
    //   { time: "11:30", isTaken: true },
    //   { time: "12:00", isTaken: false },
    //   { time: "12:30", isTaken: false },
    //   { time: "13:00", isTaken: true },
    //   { time: "13:30", isTaken: false },
    //   { time: "14:00", isTaken: false },
    //   { time: "14:30", isTaken: false },
    //   { time: "15:30", isTaken: true },
    //   { time: "16:00", isTaken: false },
    //   { time: "16:30", isTaken: false },
    //   { time: "17:00", isTaken: false },
    //   { time: "17:30", isTaken: false },
    //   { time: "23:30", isTaken: false } ])
  }, [ selectedService ])

  const renderAvailableTimes = () => {

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

    if (availableTimes.length === 0) {
      return <p>No available times on this day.</p>;
    }

    return <div className='d-flex justify-content-center flex-wrap'>{ availableTimes }</div>;
  };

  const servicesShow = () => {

    const services = props.businessDetails.services

    return (
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
          { services.map((service) => (
            <div className="card" key={ service.id }>
              <div className="card-body">
                <h5 className="card-title">{ service.name }</h5>
                <p className="card-text">
                  <strong>Service Type:</strong> { service.serviceType }
                  <br />
                  <strong>Price:</strong> ${ service.price }
                  <br />
                  <strong>Duration:</strong> { service.duration } hour(s)
                </p>
              </div>
              <div className='p-2 d-flex justify-content-center'>
                <button onClick={ () => { setServiceAndShowCalendar(service) } } className='btn btn-success'>Take</button>
              </div>
            </div>
          )) }
        </div>
      </div>
    )
  }


  return (
    <Modal onClose={ props.onClose }>
      <div class="d-flex flex-row justify-content-end p-1 w-100 ">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          dal
          onClick={ props.onClose }
        ></button>
      </div>
      {
        selectedService === null ? servicesShow()
          :
          <div className='d-flex flex-column flex-wrap align-items-center gap-1'>
            <button className='btn btn-danger mb-3'
              type='button'
              onClick={ () => {
                setSelectedService(null)
                setSchedule(false)
              } }
            >
              Choose other Service
            </button>
            <Calendar className="mb-3"
              value={ selectedDate }
              onChange={ handleDateSelect }
              minDate={ new Date() }
              maxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Show one month forward
            />
          </div>
      }
      <div className='d-flex flex-wrap justify-content-center gap-1'>
        { selectedDate && selectedService !== null && (
          <>
            <div className=''>
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
            <button
              className={ !Schedule ?
                "btn btn-primary disabled" :
                'btn btn-primary'
              }
              onClick={ () => scheduleHandler() }>
              Schedule
            </button>
          </>
        ) }
      </div>
    </Modal>

  );
};

export default AppointmentCalendar;
