import React, { useState } from "react";
import { Label, Row, Col, Button } from "reactstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // Import the customParseFormat plugin

dayjs.extend(customParseFormat); // Extend dayjs with the customParseFormat plugin

const AppointmentsDef = (props) => {
  const [ startTime, setStartTime ] = useState("");
  const [ endTime, setEndTime ] = useState("");

  const addBreakHandler = () => {
    if (startTime && endTime) {
      props.handleAddBreak(startTime, endTime);
      setStartTime("");
      setEndTime("");
    } else {
      alert("Please provide both start time and end time for the break.");
    }
  };

  if (props.currentStep !== 5) {
    return null;
  }

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
            <input
              type="time"
              className="form-control"
              value={ startTime }
              onChange={ (e) => setStartTime(e.target.value) }
            />
          </Col>
          <Col md={ 3 }>
            <input
              type="time"
              className="form-control"
              value={ endTime }
              onChange={ (e) => setEndTime(e.target.value) }
            />
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
        </Row>

        { props.appointmentsDef.fixedBreak.length > 0 && (
          <div>
            <p>Fixed Breaks:</p>
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
        { props.errors && (
          <p
            style={ {
              fontSize: "12px",
              color: "red",
            } }
          >
            { props.errors }
          </p>
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
      </form>
    </>
  );
};

export default AppointmentsDef;
