import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../UI/Modal";
import Products from "./Products";
import Services from "./Services";
import Summary from "./Summary";
import { PopupMessageContext } from "../../PopupMessage";

const AppointmentCalendar = (props) => {
  const { showMessage } = useContext(PopupMessageContext)

  const [ selectedDate, setSelectedDate ] = useState("");
  const [ selectedTime, setSelectedTime ] = useState("");
  const [ selectedService, setSelectedService ] = useState(null);
  const [ selectedProducts, setSelectedProducts ] = useState([]);
  const [ timeList, setTimeList ] = useState([]);
  const [ currentStep, setCurrentStep ] = useState(0);
  const appointmentsDef = props.appointmentsDef[ 0 ];

  const setServiceAndShowCalendar = (service) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
      setCurrentStep(0);
      setSelectedDate("");
      setSelectedTime("");
    } else if (currentStep === 4) {
      setCurrentStep(2);
    } else if (currentStep === 5) {
      setCurrentStep(4);
    }
  };
  // useEffect(() => {
  //   console.log("Selected Time:", selectedTime);
  // }, [ selectedTime ]);

  // useEffect(() => {
  //   console.log("currentStep:", currentStep);
  // }, [ currentStep ]);

  const isDayDisabled = (date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return appointmentsDef.fixedDaysOff.includes(dayName);
  };

  const addProduct = (product) => {
    const updatedProducts = [ ...selectedProducts ];
    const existingProductIndex = updatedProducts.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      // Product already exists, increase the amount
      updatedProducts[ existingProductIndex ].amount++;
    } else {
      // Product doesn't exist, add as a new item
      updatedProducts.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        amount: 1,
      });
    }

    setSelectedProducts(updatedProducts);
  };

  const scheduleHandler = async () => {
    const newAppointmentBusiness = {
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

    const newAppointmentUser = {
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

    if (selectedProducts.length > 0) {
      newAppointmentUser.purchase = selectedProducts;
      newAppointmentBusiness.purchase = selectedProducts;
    }

    try {
      const businessResponse = await fetch(
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

      const businessData = await businessResponse.json();
      // console.log("businessData" + props.businessDetails.email);

      if (businessResponse.ok) {
        showMessage(businessData.message, businessData.type);
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
        // console.log("userData" + props.profileInfo.email);

        if (userResponse.ok) {
          showMessage(userData.message, userData.type);
          props.onClose();
        } else {
          // console.log(
          //   "Failed to add appointment to the user:",
          //   userData.message
          // );
        }
      } else {
        console.log("Failed to add appointment:", businessData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

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
  }, [ selectedService, selectedDate ]);

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
    return (
      <Services
        businessDetails={ props.businessDetails }
        setServiceAndShowCalendar={ setServiceAndShowCalendar }
      />
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
      { currentStep === 0 ? (
        servicesShow()
      ) : (
        <div className="d-flex flex-column flex-wrap align-items-center gap-1 pb-2">
          { currentStep > 0 && currentStep < 4 && (
            <Calendar
              calendarType="Hebrew"
              locale="en-US"
              value={ selectedDate }
              onChange={ handleDateSelect }
              minDate={ new Date() }
              maxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Show one month forward
              tileDisabled={ ({ date }) => isDayDisabled(date) }
            />
          ) }
        </div>
      ) }
      <div className="d-flex flex-wrap justify-content-center gap-1">
        { currentStep > 1 && currentStep < 4 && (
          <>
            <div className="">
              <p className="d-flex justify-content-center fs-5 text-dark badge bg-warning">
                { ` Available times for ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}` }
              </p>
              { selectedDate && renderAvailableTimes() }
              { !selectedTime && (
                <p className="d-flex justify-content-center fs-6 badge bg-danger">
                  Please select a time.
                </p>
              ) }
              { selectedTime && (
                <p className="d-flex justify-content-center fs-6 badge text-light bg-success">
                  { `You have selected ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()} ${selectedTime}` }
                </p>
              ) }
            </div>
          </>
        ) }
      </div>
      { currentStep === 4 && (
        <Products
          addProduct={ addProduct }
          businessDetails={ props.businessDetails }
        />
      ) }

      { currentStep === 5 && (
        <div className="summary-section">
          <Summary
            selectedDate={ selectedDate }
            selectedTime={ selectedTime }
            selectedService={ selectedService }
            selectedProducts={ selectedProducts }
            profileInfo={ props.profileInfo }
            businessDetails={ props.businessDetails }
          />
        </div>
      ) }

      { currentStep !== 0 && (
        <div className="d-flex flex-wrap justify-content-center gap-1 pt-1">
          <button
            className={
              currentStep < 1 ? "btn btn-primary disabled" : "btn btn-primary"
            }
            onClick={ () => handleBack() }
          >
            back
          </button>

          <button
            className={
              currentStep < 5 ? "btn btn-primary disabled" : "btn btn-primary"
            }
            onClick={ () => scheduleHandler() }
          >
            Schedule
          </button>
          <button
            className={
              currentStep < 3 || currentStep > 4
                ? "btn btn-primary disabled"
                : "btn btn-primary"
            }
            onClick={ () => {
              setCurrentStep(currentStep + 1);
            } }
          >
            continue
          </button>
        </div>
      ) }
    </Modal>
  );
};

export default AppointmentCalendar;
