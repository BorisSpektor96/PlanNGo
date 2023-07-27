import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../UI/Modal";
import Products from "./Products";

const AppointmentCalendar = (props) => {

  const [ selectedDate, setSelectedDate ] = useState("");
  const [ selectedTime, setSelectedTime ] = useState("");
  const [ showCalendar, setShowCalendar ] = useState(false);
  const [ selectedService, setSelectedService ] = useState(null);
  const [ Schedule, setSchedule ] = useState(false); // disable/enable the schedual button
  const [ timeList, setTimeList ] = useState([]);
  const [ showProducts, setShowProducts ] = useState(false);

  const appointmentsDef = props.appointmentsDef[ 0 ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const setServiceAndShowCalendar = (service) => {
    setSelectedService(service);
    setShowCalendar(!showCalendar);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  useEffect(() => {
    console.log("Selected Time:", selectedTime);
  }, [ selectedTime ]);

  const isDayDisabled = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return appointmentsDef.fixedDaysOff.includes(dayName);
  };

  console.log(props.profileInfo)

  const scheduleHandler = async () => {

    let newAppointmentBusiness = {
      date: new Date(selectedDate),
      service: selectedService,
      userDetails: {
        name: props.profileInfo.fullname,
        email: props.profileInfo.email,
        phoneNumber: props.profileInfo.phoneNumber,
      },
    };
    newAppointmentBusiness.date.setHours(parseInt(selectedTime.slice(0, 2)));
    newAppointmentBusiness.date.setMinutes(parseInt(selectedTime.slice(3, 5)));
    let newAppointmentUser = {
      date: new Date(selectedDate),
      service: selectedService,
      businessDetails: {
        name: props.businessDetails.business_name,
        email: props.businessDetails.email,
        phoneNumber: props.businessDetails.phoneNumber,
        address: props.businessDetails.address,
      },
    };
    newAppointmentUser.date.setHours(parseInt(selectedTime.slice(0, 2)));
    newAppointmentUser.date.setMinutes(parseInt(selectedTime.slice(3, 5)));
    try {
      const response = await fetch(
        "http://localhost:3001/business/addAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: props.businessDetails.email,
            appointment: newAppointmentBusiness,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("Appointment added successfully");
        // Now, add the appointment to the user
        const userResponse = await fetch(
          "http://localhost:3001/users/addAppointmentToUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: props.profileInfo.email,
              appointment: newAppointmentUser,
            }),
          }
        );

        const userData = await userResponse.json();
        console.log(userData);

        if (userResponse.ok) {
          console.log("Appointment added to the user successfully");
          setSchedule(false);
          setShowProducts(true);
          setShowCalendar(!showCalendar);

        } else {
          console.log(
            "Failed to add appointment to the user:",
            userData.message
          );
        }
      } else {
        console.log("Failed to add appointment:", data.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
      // Handle any network or other errors here
    }
  };

  useEffect(() => {
    if (
      selectedDate !== "" &&
      selectedService !== null &&
      selectedTime !== ""
    ) {
      setSchedule(true);
    } else {
      setSchedule(false);
    }
  }, [ selectedTime, selectedService, selectedDate ]);

  const timeToString = (timeString) => {
    const [ hours, minutes ] = timeString.split(":").map(Number);
    const time = new Date();
    time.setHours(hours, minutes, 0);
    return time;
  };
  const isAppointmentExist = (time, date) => {
    const selectedDateTime = new Date(date);
    const formattedTime = time.split(":");
    selectedDateTime.setHours(formattedTime[ 0 ], formattedTime[ 1 ], 0);

    const appointments = props.appointmentsDef[ 0 ].appointments;
    for (const appointment of appointments) {
      const appointmentDateTime = new Date(appointment.date);
      if (selectedDateTime.getTime() === appointmentDateTime.getTime()) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (selectedService !== null) {
      const start = timeToString(props.workingHours.start);
      const end = timeToString(props.workingHours.end);

      let minutes = selectedService.duration * 60;
      let hours = Math.floor(selectedService.duration);
      minutes = minutes - hours * 60;

      const serviceDuration =
        timeToString(`${hours}:${minutes}`).getHours() * 60 +
        timeToString(`${hours}:${minutes}`).getMinutes();

      const filteredList = [];
      for (
        let i = start;
        i.getTime() < end.getTime();
        i = new Date(i.getTime() + 60000 * serviceDuration)
      ) {
        let time = {};
        if (
          timeToString(appointmentsDef.fixedBreak[ 0 ].start).getTime() <=
          i.getTime() &&
          i.getTime() <
          timeToString(appointmentsDef.fixedBreak[ 0 ].end).getTime()
        ) {
          time = { time: i, isTaken: true };
        } else {
          time = { time: i, isTaken: false };
        }
        if (time !== null) {
          filteredList.push(time);
        }
      }

      setTimeList(
        filteredList.filter(
          (time) =>
            time.time > new Date(10, 0, 0) && time.time < new Date(21, 0, 0)
        )
      );

      setTimeList(filteredList);
    } else {
      setSelectedDate("");
    }
  }, [ selectedService ]);


  const renderAvailableTimes = () => {
    let availableTimes = timeList.map(({ time, isTaken }) => {
      const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const isSelectedTimeTaken =
        isTaken || isAppointmentExist(formattedTime, selectedDate);
      const isSelectedTime = formattedTime === selectedTime;

      if (!isSelectedTimeTaken) {
        return (
          <button
            className={ `btn ${isSelectedTime ? "btn btn-success" : " btn btn-outline-success"
              } m-2` }
            key={ time }
            onClick={ () => handleTimeSelect(formattedTime) }
          >
            { formattedTime }
          </button>
        );
      }
      return (
        <button className="btn btn-dark m-2 disabled" key={ formattedTime }>
          { formattedTime }
        </button>
      );
    });

    if (availableTimes.length === 0) {
      return <p>No available times on this day.</p>;
    }

    return (
      <div className="d-flex justify-content-center flex-wrap">
        { availableTimes }
      </div>
    );
  };

  const servicesShow = () => {
    const services = props.businessDetails.services;

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
              <div className="p-2 d-flex justify-content-center">
                <button
                  onClick={ () => {
                    setServiceAndShowCalendar(service);
                  } }
                  className="btn btn-success"
                >
                  Take
                </button>
              </div>
            </div>
          )) }
        </div>
      </div>
    );
  };

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
      { selectedService === null ? (
        servicesShow()
      ) : (
        <div className="d-flex flex-column flex-wrap align-items-center gap-1">
          <button
            className="btn btn-danger mb-3"
            type="button"
            onClick={ () => {
              setSelectedService(null);
              setSchedule(false);
            } }
          >
            Choose other Service
          </button>
          { !showProducts &&
            <Calendar
              calendarType='Hebrew'

              locale="en-US"
              value={ selectedDate }
              onChange={ handleDateSelect }
              minDate={ new Date() }
              maxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Show one month forward
              tileDisabled={ ({ date }) => isDayDisabled(date) }

            /> }
        </div>
      ) }
      <div className="d-flex flex-wrap justify-content-center gap-1">
        { !showProducts && selectedDate && selectedService !== null && (
          <>
            <div className="">
              <p className="d-flex justify-content-center fs-5 text-dark badge bg-warning">
                Available times for { selectedDate.toLocaleDateString() }:
              </p>
              { renderAvailableTimes() }
              { !selectedTime && (
                <p className="d-flex justify-content-center fs-6 badge bg-danger">
                  Please select a time.
                </p>
              ) }
              { selectedTime && (
                <p className="d-flex justify-content-center fs-6 badge bg-success">
                  You have selected { selectedDate.toLocaleDateString() } at{ " " }
                  { selectedTime }.
                </p>
              ) }
            </div>
            <button
              className={
                !Schedule ? "btn btn-primary disabled" : "btn btn-primary"
              }
              onClick={ () => scheduleHandler() }
            >
              Schedule
            </button>
          </>
        ) }
      </div>
      { showProducts && <Products businessDetails={ props.businessDetails } /> }
    </Modal>
  );
};

export default AppointmentCalendar;