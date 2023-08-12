import { useContext, useState, useEffect } from "react";
// import { ProfileInfoContext } from "../../ProfileInfoContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { PopupMessageContext } from './../../PopupMessage';
import AppointmentItem from "./AppointmentItem";
import { AuthContext } from '../../AuthContext'
import { Label, Row, Col, Button } from "reactstrap";

import { useSelector } from "react-redux";
import { Store } from '../../Store'

dayjs.extend(customParseFormat);
const AppointmentsProfile = () => {

  const { showMessage } = useContext(PopupMessageContext)
  const { isBusiness } = useContext(AuthContext)
  const [ appointmentRemoved, setAppointmentRemoved ] = useState(false)

  const [ startTime, setStartTime ] = useState("");
  const [ endTime, setEndTime ] = useState("");

  const updateAppointments = () => {
    setAppointmentRemoved(!appointmentRemoved)
  }

  const profileInfo = useSelector(state => state.profileInfo)

  const [ appointments, setAppointments ] = useState([]);
  const [ appointmentsDef, setAppointmentsDef ] = useState([
    {
      fixedBreak: {
        start: "",
        end: "",
      },
      fixedDaysOff: [],
      OneTimeDayOff: [],
      appointments: [],
      businessHours: {
        start: "",
        end: "",
      }
    }
  ]);

  useEffect(() => {
    if (isBusiness) {
      // getAppointmentsDetailsBusiness()
      setAppointments(profileInfo.appointmentsDef[ 0 ].appointments)
      getAppointmentsDefBusiness()
    } else {
      // getAppointmentsDetailsUser()
      setAppointments(profileInfo.appointments)
    }
  }, [ profileInfo ])

  useEffect(() => {
    if (isBusiness) {
      getAppointmentsDetailsBusiness()
    } else {
      getAppointmentsDetailsUser()
    }
  }, [ appointmentRemoved ])


  const removeAppointment = async (appointment) => {

    const businessEmail = appointment.businessEmail
    const clientEmail = appointment.userEmail

    if (isBusiness) {
      businessEmail = appointment.userEmail
      clientEmail = appointment.businessEmail
    }
    try {
      const response = await fetch('http://localhost:3001/business/removeAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessEmail: businessEmail,
          date: appointment.date,
          userEmail: clientEmail
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user !== null) {
          showMessage(data.message, data.type)
        }
      } else {
      }
    } catch (error) {
      console.log('Error:', error);
    }

    try {
      const response = await fetch('http://localhost:3001/users/removeAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: clientEmail,
          date: appointment.date,
          businessEmail: businessEmail
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user !== null) {
          showMessage(data.message, data.type)
        }
      } else {
      }
    } catch (error) {
      console.log('Error:', error);
    }
    updateAppointments()
  }


  const getAppointmentsDetailsUser = async () => {
    try {
      const appointmentsData = await fetch('http://localhost:3001/users/getAppointmentsDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });

      if (appointmentsData.ok) {
        const appointment = await appointmentsData.json()
        setAppointments(appointment.appointments)
        appointments.forEach(item => {
          item[ "toggle" ] = false
        })
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const getAppointmentsDetailsBusiness = async () => {
    try {
      const appointmentsData = await fetch('http://localhost:3001/business/getAppointmentsDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });
      if (appointmentsData.ok) {
        const appointments = await appointmentsData.json()
        setAppointments(appointments)
        appointments.forEach(item => {
          item[ "toggle" ] = false
        })
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const getAppointmentsDefBusiness = async () => {
    try {
      const data = await fetch('http://localhost:3001/business/getAppointmentsDef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });
      if (data.ok) {
        const def = await data.json()
        setAppointmentsDef(def)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const addBreakHandler = () => {
    console.log(startTime, endTime);

    if (startTime && endTime) {
      handleAddBreak(startTime, endTime);
      setStartTime("");
      setEndTime("");
    } else {
      alert("Please provide both start time and end time for the break.");
    }
  };

  const generateStartTimeOptions = () => {
    const startTimeOptions = [];
    for (let hours = 5; hours <= 21; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        startTimeOptions.push(formattedTime);
      }
    }
    return startTimeOptions;
  };

  const generateEndTimeOptions = () => {
    const endTimeOptions = [];
    for (let hours = 5; hours <= 21; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        endTimeOptions.push(formattedTime);
      }
    }
    return endTimeOptions;
  };


  const handleAddBreak = (startTime, endTime) => {
    const formattedStartTime = dayjs(startTime, "HH:mm", true);
    const formattedEndTime = dayjs(endTime, "HH:mm", true);

    if (formattedEndTime.isValid() && formattedEndTime.isAfter(formattedStartTime)) {
      const breakTimeRange = {
        start: formattedStartTime.format("HH:mm"),
        end: formattedEndTime.format("HH:mm"),
      };

      this.setState((prevState) => ({
        appointmentsDef: {
          ...prevState.appointmentsDef,
          fixedBreak: breakTimeRange, // Set the new break time range object
        },
      }));
    } else {
      alert("Invalid break time range. End time should be after start time.");
    }
  };

  const handleDeleteBreak = (index) => {
    this.setState((prevState) => {
      const updatedBreaks = [ ...prevState.appointmentsDef.fixedBreak ];
      updatedBreaks.splice(index, 1);
      return {
        ...prevState,
        appointmentsDef: {
          ...prevState.appointmentsDef,
          fixedBreak: updatedBreaks,
        },
      };
    });
  };

  const handleDayCheckboxChange = (day) => {
    this.setState(
      (prevState) => {
        if (prevState.appointmentsDef.fixedDaysOff.includes(day)) {
          return {
            ...prevState,
            appointmentsDef: {
              ...prevState.appointmentsDef,
              fixedDaysOff: prevState.appointmentsDef.fixedDaysOff.filter(
                (selectedDay) => selectedDay !== day
              ),
            },
          };
        } else {
          return {
            ...prevState,
            appointmentsDef: {
              ...prevState.appointmentsDef,
              fixedDaysOff: [ ...prevState.appointmentsDef.fixedDaysOff, day ],
            },
          };
        }
      },
      () => {
        // Callback function that runs after the state has been updated
        console.log(
          "Updated fixedDaysOff:",
          this.state.appointmentsDef.fixedDaysOff
        );
      }
    );
  };

  const handleOpeningEndTimeChange = (value) => {
    this.setState((prevState) => ({
      appointmentsDef: {
        ...prevState.appointmentsDef,
        businessHours: {
          ...prevState.appointmentsDef.businessHours,
          end: value,
        },
      },
    }));
  };

  const handleOpeningStartTimeChange = (value) => {
    this.setState((prevState) => ({
      appointmentsDef: {
        ...prevState.appointmentsDef,
        businessHours: {
          ...prevState.appointmentsDef.businessHours,
          start: value,
        },
      },
    }));
  };


  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className=" mt-4">
      { profileInfo.isBusiness &&
        <div className="d-flex flex-column align-items-center">
          <p className="text-center display-6">Calendar Settings</p>
          <form>
            <Row className="align-items-center">

              <Col md={ 2 }>
                <Label className="mt-2 me-1" for="fixedBreak">
                  regular Break
                </Label>
              </Col>

              <Col md={ 3 }>
                <div className="d-flex">
                  <Label className="mt-2 me-1">
                    Start:
                  </Label>
                  <select
                    className="form-control"
                    value={ startTime }
                    onChange={ (e) => setStartTime(e.target.value) }
                  >
                    { generateStartTimeOptions().map((time) => (
                      <option key={ time } value={ time }>
                        { time }
                      </option>
                    )) }
                  </select>
                </div>
              </Col>

              <Col md={ 3 }>
                <div className="d-flex">
                  <Label className="mt-2 me-1">
                    End:
                  </Label>
                  <select
                    className="form-control"
                    value={ endTime }
                    onChange={ (e) => setEndTime(e.target.value) }
                  >
                    { generateEndTimeOptions().map((time) => (
                      <option key={ time } value={ time }>
                        { time }
                      </option>
                    )) }
                  </select>
                </div>
              </Col>

              <Col md={ 3 }>
                <Button
                  className="btn btn-success px-4"
                  onClick={ addBreakHandler }
                  type="button"
                >
                  Add break
                </Button>
              </Col>

            </Row>

            {/* { appointmentsDef.fixedBreak.length > 0 && (
            <div>
              <ul>
                { appointmentsDef.fixedBreak.map((breakTime, index) => (
                  <li className="m-1" key={ index }>
                    { `Start: ${breakTime.start}, End: ${breakTime.end}` }
                    <Button
                      color="danger"
                      size="sm"
                      className="ms-1"
                      onClick={ () => handleDeleteBreak(index) }
                    >
                      Delete
                    </Button>
                  </li>
                )) }
              </ul>
            </div>
          ) } */}
            {/* { props.errors && (
            <p
              style={ {
                fontSize: "12px",
                color: "red",
              } }
            >
              { props.errors }
            </p>
          ) } */}

            <div className="mt-2">
              <Label className="mt-4 me-3" for="fixedBreak">
                fixedDaysOff:
              </Label>
              { daysOfWeek.map((day) => (
                <div className="form-check form-check-inline" key={ day }>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={ day }
                    value={ day }
                  // checked={ appointmentsDef.fixedDaysOff.includes(day) }
                  // onChange={ () => handleDayCheckboxChange(day) }
                  />
                  <label className="form-check-label" htmlFor={ day }>
                    { day }
                  </label>
                </div>
              )) }
            </div>

            <div className="mt-2 pt-3">
              <Row className="align-items-center">

                <Col md={ 2 }>
                  <Label className="" for="fixedBreak">
                    Opening hours
                  </Label>
                </Col>

                <Col md={ 3 }>
                  <div className="d-flex">
                    <Label className="mt-2 me-1">
                      Start:
                    </Label>
                    <select
                      id="openingStartTime"
                      className="form-control"
                    // value={ appointmentsDef.businessHours.start }
                    // onChange={ (e) => handleOpeningStartTimeChange(e.target.value) }
                    >
                      { generateStartTimeOptions().map((time) => (
                        <option key={ time } value={ time }>
                          { time }
                        </option>
                      )) }
                    </select>
                  </div>
                </Col>
                <Col md={ 3 }>
                  <div className="d-flex">
                    <Label className="mt-2 me-1">
                      End:
                    </Label>
                    <select
                      id="openingEndTime"
                      className="form-control"
                    // value={ appointmentsDef.businessHours.end }
                    // onChange={ (e) => handleOpeningEndTimeChange(e.target.value) }
                    >
                      { generateEndTimeOptions().map((time) => (
                        <option key={ time } value={ time }>
                          { time }
                        </option>
                      )) }
                    </select>
                  </div>
                </Col>

              </Row>
            </div>
          </form>
        </div>
      }
      <h5 className="d-flex justify-content-center m-1">Appointments</h5>
      <ul className="p-3 list-group list-group-flush">
        { appointments && appointments.length > 0 ?
          (<>
            { appointments.map((item) => (
              <AppointmentItem
                removeAppointment={ removeAppointment }
                item={ item }
              />
            )) }
          </>)
          :
          (<>
            <p className="text-center">There is no Appointments</p>
          </>)
        }
      </ul>
    </div>
  )

}

export default AppointmentsProfile