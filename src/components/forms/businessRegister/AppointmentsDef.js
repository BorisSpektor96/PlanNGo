import React, { useState } from "react";
import { Label, Row, Col, Button } from "reactstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // Import the customParseFormat plugin

dayjs.extend(customParseFormat); // Extend dayjs with the customParseFormat plugin

const AppointmentsDef = (props) => {
  const [ fixedBreak, setFixedBreak ] = useState({
    start: "",
    end: "",
  });
  const [ businessHours, setBusinessHours ] = useState({
    start: "",
    end: "",
  });

  const onChangeOpeningStartTime = (start) => {
    setBusinessHours((prevState) => ({
      ...prevState,
      start: start,
    }));
    props.handleOpeningStartTimeChange(start);
  };

  const onChangeOpeningEndTime = (end) => {
    setBusinessHours((prevState) => ({
      ...prevState,
      end: end,
    }));
    props.handleOpeningEndTimeChange(end);
  };

  const addBreakHandler = () => {

    if (fixedBreak.start && fixedBreak.end) {
      props.handleAddBreak(fixedBreak.start, fixedBreak.end);
      setFixedBreak({ start: "", end: "" })
    }
  };

  if (props.currentStep !== 5) {
    return null;
  }

  const generateTimeOptions = () => {
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
    <>
      <p className="text-center display-6">Calendar Settings</p>
      <form>
        <Row className="align-items-center">
          <Col md={ 2 }>
            <Label className="mt-2 me-1" for="fixedBreak">
              regular Break
            </Label>
          </Col>
          <Col md={ 3 }>
            <select
              className="form-control"
              value={ fixedBreak.start }
              onChange={ (e) => setFixedBreak({ ...fixedBreak, start: e.target.value }) }
            >
              { generateTimeOptions().map((time) => (
                <option key={ time } value={ time }>
                  { time }
                </option>
              )) }
            </select>
          </Col>
          <Col md={ 3 }>
            <select
              className="form-control"
              value={ fixedBreak.end }
              onChange={ (e) => setFixedBreak({ ...fixedBreak, end: e.target.value }) }
            >
              { generateTimeOptions().map((time) => (
                <option key={ time } value={ time }>
                  { time }
                </option>
              )) }
            </select>
          </Col>
          <Col md={ 3 }>
            <Button
              className="btn btn-success mt-2 px-4"
              onClick={ addBreakHandler }
              type="button"
            >
              Add break
            </Button>
          </Col>
          { props.errors[ "break" ] && (
            <p
              style={ {
                fontSize: "12px",
                color: "red",
              } }
            >
              { props.errors[ "break" ] }
            </p>
          ) }
        </Row>

        { props.appointmentsDef.fixedBreak.length > 0 && (
          <div>
            <ul>
              { props.appointmentsDef.fixedBreak.map((breakTime, index) => (
                <li className="m-1" key={ index }>
                  { `Start: ${breakTime.start}, End: ${breakTime.end}` }
                  <Button
                    color="danger"
                    size="sm"
                    className="ms-1"
                    onClick={ () => props.handleDeleteBreak(index) }
                  >
                    Delete
                  </Button>
                </li>
              )) }
            </ul>
          </div>
        ) }


        <div className="mt-2">
          <Label className="mt-4 me-2" for="fixedBreak">
            fixedDaysOff
          </Label>
          { daysOfWeek.map((day) => (
            <div className="form-check form-check-inline" key={ day }>
              <input
                className="form-check-input"
                type="checkbox"
                id={ day }
                value={ day }
                checked={ props.appointmentsDef.fixedDaysOff.includes(day) }
                onChange={ () => props.handleDayCheckboxChange(day) }
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
              <select
                id="openingStartTime"
                className="form-control"
                value={ businessHours.start }
                onChange={ (e) => onChangeOpeningStartTime(e.target.value) }
              >
                { generateTimeOptions().map((time) => (
                  <option key={ time } value={ time }>
                    { time }
                  </option>
                )) }
              </select>
            </Col>
            <Col md={ 3 }>
              <select
                id="openingEndTime"
                className="form-control"
                value={ businessHours.end }
                onChange={ (e) => onChangeOpeningEndTime(e.target.value) }
              >
                { generateTimeOptions().map((time) => (
                  <option key={ time } value={ time }>
                    { time }
                  </option>
                )) }
              </select>
            </Col>
            { props.errors[ "businessHours" ] && (
              <p
                style={ {
                  fontSize: "12px",
                  color: "red",
                } }
              >
                { props.errors[ "businessHours" ] }
              </p>
            ) }
          </Row>
        </div>
      </form>
    </>
  );
};

export default AppointmentsDef;