import { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { PopupMessageContext } from './../../PopupMessage';
import AppointmentItem from "./AppointmentItem";
import { AuthContext } from '../../AuthContext'
import { Label, Row, Col, Button } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { updateAppointmentsDef, updateAppointments } from '../../profileInfoSlice'
import { sendMessage, createMessage } from "../messages/messageService";

dayjs.extend(customParseFormat);

const AppointmentsProfile = () => {

  const dispatch = useDispatch()

  const { showMessage } = useContext(PopupMessageContext)
  const { isBusiness } = useContext(AuthContext)

  const [ isExpanded, setIsExpanded ] = useState(false);
  const initialItemCount = 2;

  const toggleList = () => {
    setIsExpanded(!isExpanded);
  };

  const [ oneTimeDate, setOneTimeDate ] = useState('')

  const [ startTime, setStartTime ] = useState("");
  const [ endTime, setEndTime ] = useState("");

  const profileInfo = useSelector(state => state.profileInfo)

  const [ appointments, setAppointments ] = useState([]);
  const [ appointmentsDef, setAppointmentsDef ] = useState(
    {
      fixedBreak: {
        start: "",
        end: "",
      },
      fixedDaysOff: [],
      OneTimeDayOff: [ '16/08/23' ],
      appointments: [],
      businessHours: {
        start: "",
        end: "",
      }
    }
  );

  useEffect(() => {
    if (isBusiness) {
      let sortedAppointments = [ ...profileInfo.appointmentsDef.appointments ];
      sortedAppointments.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      const filteredAppointments = sortedAppointments.filter(appointment => appointment.type !== 'lock');
      setAppointments(filteredAppointments);

      setAppointmentsDef(profileInfo.appointmentsDef)
    } else {
      let sortedAppointments = [ ...profileInfo.appointments ];
      sortedAppointments.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      setAppointments(sortedAppointments);

    }
  }, [ profileInfo ])

  const sendCancellationMessages = async (userEmail, businessEmail, appointmentDate, serviceName) => {
    const currentDate = new Date();
    const status = "received";
    const read = false;
    const subject = `Appointment Cancellation.`;
    const content = `Appointment at ${appointmentDate.toLocaleDateString()}, ${appointmentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
     for ${serviceName} for has been canceled.`;

    try {
      const messageDataToUser = createMessage(
        read,
        businessEmail,
        currentDate.toISOString(),
        content,
        status,
        subject,
        false
      );
      await sendMessage(userEmail, messageDataToUser, false);
    } catch (error) {
      console.log("Error sending cancellation message to user:", error);
    }

    try {
      const messageDataToBusiness = createMessage(
        read,
        userEmail,
        currentDate.toISOString(),
        content,
        status,
        subject,
        true
      );
      await sendMessage(businessEmail, messageDataToBusiness, true);
    } catch (error) {
      console.log("Error sending cancellation message to business:", error);
    }
  };

  const removeAppointment = async (appointment) => {

    const email = profileInfo.email
    const otherEmail = appointment.appointmentEmail

    try {
      const response = await fetch('http://localhost:3001/business/removeAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessEmail: isBusiness ? email : otherEmail,
          date: appointment.date,
          userEmail: isBusiness ? otherEmail : email,
          type: 'not lock'
        })
      });

      const data = await response.json();
      if (response.ok) {
        await sendCancellationMessages(email, otherEmail, appointment.date, appointment.service.name);
        if (data.appointments !== null) {
          showMessage(data.message, data.type)
          if (isBusiness) {
            dispatch(updateAppointments(data.appointments));
          }
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
          businessEmail: isBusiness ? email : otherEmail,
          date: appointment.date,
          userEmail: isBusiness ? otherEmail : email,
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user !== null) {
          showMessage(data.message, data.type)
          if (!isBusiness) {
            dispatch(updateAppointments(data.appointments));
          }
        }
      } else {
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const addDateOffHandler = () => {
    if (!appointmentsDef.OneTimeDayOff.includes(oneTimeDate)) {
      setAppointmentsDef((prevState) => ({
        ...prevState,
        OneTimeDayOff: [ ...prevState.OneTimeDayOff, oneTimeDate ],
      }));
      setOneTimeDate('');
    }
  };

  const handleDeleteDate = (index) => {
    setAppointmentsDef((prevState) => ({
      ...prevState,
      OneTimeDayOff: prevState.OneTimeDayOff.filter((value, i) => i !== index),
    }));
  };

  const addBreakHandler = () => {
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
      const newBreak = {
        start: formattedStartTime.format("HH:mm"),
        end: formattedEndTime.format("HH:mm"),
      };

      setAppointmentsDef((prevState) => ({
        ...prevState,
        fixedBreak: [ ...prevState.fixedBreak, newBreak ],
      }));
    } else {
      alert("Invalid break time range. End time should be after start time.");
    }
  };

  const handleDeleteBreak = (index) => {
    setAppointmentsDef((prevState) => {
      const updatedBreaks = [ ...prevState.fixedBreak ];
      updatedBreaks.splice(index, 1);
      return {
        ...prevState,
        fixedBreak: updatedBreaks,
      };
    });
  };

  const handleDayCheckboxChange = (day) => {
    setAppointmentsDef((prevState) => {
      if (prevState.fixedDaysOff.includes(day)) {
        return {
          ...prevState,
          fixedDaysOff: prevState.fixedDaysOff.filter((selectedDay) => selectedDay !== day),
        };
      } else {
        return {
          ...prevState,
          fixedDaysOff: [ ...prevState.fixedDaysOff, day ],
        };
      }
    });
  };

  const handleOpeningEndTimeChange = (value) => {
    setAppointmentsDef((prevState) => ({
      ...prevState,
      businessHours: {
        ...prevState.businessHours,
        end: value,
      },
    }));
  };

  const handleOpeningStartTimeChange = (value) => {
    setAppointmentsDef((prevState) => ({
      ...prevState,
      businessHours: {
        ...prevState.businessHours,
        start: value,
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

  const updateAppointmentsDefOnServer = async (newAppointmentsDef) => {
    try {
      const response = await fetch('http://localhost:3001/business/updateAppointmentsDef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profileInfo.email,
          newAppointmentsDef: newAppointmentsDef
        }),
      });

      const data = await response.json();
      if (response.ok) {
        showMessage(data.message, data.type)
        dispatch(updateAppointmentsDef(data.appointmentsDef));
      } else {
        showMessage(data.message, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAppointmentsDefOnServer(appointmentsDef);
    } catch (error) {
      console.error("Error updating appointments definition:", error);
    }
  };

  return (
    <div className=" mt-4">
      { profileInfo.isBusiness && <hr /> }
      { profileInfo.isBusiness &&
        <div className="d-flex flex-column align-items-center">
          <p className="text-center display-6">Calendar Settings</p>
          <form onSubmit={ handleSubmit }>
            <Row className="">

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

            { appointmentsDef.fixedBreak && appointmentsDef.fixedBreak.length > 0 && (
              <div className="mt-4">
                <ul>
                  { appointmentsDef.fixedBreak.map((breakTime, index) => (
                    <li className="mb-1" key={ index }>
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
            ) }

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
                    checked={ appointmentsDef.fixedDaysOff.includes(day) }
                    onChange={ () => handleDayCheckboxChange(day) }
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
                      value={ appointmentsDef.businessHours.start }
                      onChange={ (e) => handleOpeningStartTimeChange(e.target.value) }
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
                      value={ appointmentsDef.businessHours.end }
                      onChange={ (e) => handleOpeningEndTimeChange(e.target.value) }
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

              <Row>
                <div className="d-flex mt-2 gap-3">
                  <Col md={ 2 }>
                    <Label>Day Of By Date:</Label>
                  </Col>
                  <Col md={ 3 }>
                    <input
                      type="date"
                      className="form-control text-center"
                      value={ oneTimeDate }
                      onChange={ (e) => {
                        if (e.target.value) {
                          setOneTimeDate(e.target.value);
                        }
                      } }
                      min={ dayjs().add(1, 'day').format('YYYY-MM-DD') }
                      max={ dayjs().add(2, 'month').format('YYYY-MM-DD') }
                    />
                  </Col>
                  <Col md={ 3 }>
                    <Button
                      className="btn btn-success px-4"
                      onClick={ addDateOffHandler }
                      type="button"
                      disabled={ !oneTimeDate }
                    >
                      Add Date
                    </Button>
                  </Col>
                </div>
              </Row>
              { appointmentsDef.OneTimeDayOff && appointmentsDef.OneTimeDayOff.length > 0 && (
                <div className="mt-4">
                  <ul>
                    { appointmentsDef.OneTimeDayOff.map((breakDate, index) => (
                      <li className="mb-1" key={ index }>
                        { `${new Date(breakDate).getDate()}/${new Date(breakDate).getMonth() + 1}/${new Date(breakDate).getFullYear().toString().slice(2)}` }
                        <Button
                          color="danger"
                          size="sm"
                          className="ms-1"
                          onClick={ () => handleDeleteDate(index) }
                        >
                          Delete
                        </Button>
                      </li>
                    )) }
                  </ul>
                </div>
              ) }

              <div className="d-flex justify-content-center m-3">
                <button className="btn btn-outline-success" type="submit" >Submit</button>
              </div>
            </div>
          </form>
        </div>
      }
      { profileInfo.isBusiness && <hr /> }
      <div className="d-flex justify-content-around">
        <h5 className="d-flex justify-content-center m-1">Appointments</h5>
        { appointments.length > initialItemCount && (
          <button onClick={ toggleList }
            style={ { width: '120px' } }
            className="btn btn-primary">
            { isExpanded ? "Show Less" : "Show All" }
          </button>
        ) }
      </div>
      <div>
        <ul className="p-3 list-group list-group-flush">
          { appointments.slice(0, isExpanded ? appointments.length : initialItemCount).map((item) => (
            <AppointmentItem
              key={ item.id }
              removeAppointment={ removeAppointment }
              item={ item }
              isExpanded={ isExpanded }
            />
          )) }
        </ul>
      </div>
    </div>
  )

}

export default AppointmentsProfile