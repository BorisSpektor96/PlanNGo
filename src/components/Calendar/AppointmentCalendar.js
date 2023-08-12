import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../UI/Modal";
import Products from "./products/Products";
import Services from "./Services";
import Summary from "./Summary";
import { PopupMessageContext } from "../../PopupMessage";
import Cart from "./cart/Cart";

import { useSelector, useDispatch } from "react-redux";
import { updateAppointments } from "../../profileInfoSlice";

const AppointmentCalendar = (props) => {

  const profileInfo = useSelector(state => state.profileInfo)
  const dispatch = useDispatch()

  const { showMessage } = useContext(PopupMessageContext);
  const [ selectedDate, setSelectedDate ] = useState("");
  const [ selectedTime, setSelectedTime ] = useState("");
  const [ selectedService, setSelectedService ] = useState(null);
  const [ selectedProducts, setSelectedProducts ] = useState([]);
  const [ timeList, setTimeList ] = useState([]);
  const [ currentStep, setCurrentStep ] = useState(0);
  const appointmentsDef = props.appointmentsDef[ 0 ];

  // const sendEmail = () => {
  //   if (!props.profileInfo || !props.businessDetails) {
  //     console.log("Error: Profile info or business details are undefined");
  //     return;
  //   }
  //   const templateParams = {
  //     user_name: props.profileInfo.fullname,
  //     business_name: props.businessDetails.business_name,
  //     user_mail: props.profileInfo.email,
  //     date:selectedDate,
  //     time:selectedTime,
  //     Service: selectedService.name,
  //     duration: selectedService.duration
  //   };

  //   emailjs.sendForm('service_g0jkiit', 'template_3lmq448', templateParams, 'KL4TZz4uZS0SXCMop')
  //     .then(
  //       (result) => {
  //         console.log("Email sent successfully:", result.text);
  //         // Show the user a success message if needed
  //       },
  //       (error) => {
  //         console.log("Error sending email:", error.text);
  //         // Show the user an error message if needed
  //       }
  //     );
  // };

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
      setSelectedTime("");
      setCurrentStep(1);
    } else if (currentStep === 5) {
      setCurrentStep(4);
    }
  };

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
      updatedProducts[ existingProductIndex ].amount++;
    } else {
      // Product doesn't exist, add as a new item
      updatedProducts.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        amount: 1, // Initialize the quantity to 1
        photo: product.photo,
      });
    }

    setSelectedProducts(updatedProducts);
  };

  const handleIncrease = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, amount: product.amount + 1 }
          : product
      )
    );
  };

  const handleDecrease = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product.productId === productId
            ? { ...product, amount: product.amount - 1 }
            : product
        )
        .filter((product) => product.amount > 0) // Remove products with amount 0
    );
  };

  const deleteProductHandler = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== productId)
    );
  };

  const scheduleHandler = async () => {
    const newAppointmentBusiness = {
      date: new Date(selectedDate),
      service: selectedService,
      userDetails: {
        name: profileInfo.fullname,
        email: profileInfo.email,
        phoneNumber: profileInfo.phoneNumber,
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

      if (businessResponse.ok) {
        showMessage(businessData.message, businessData.type);
        props.onClose();

        // Now, add the appointment to the user
        const userResponse = await fetch(
          "http://localhost:3001/users/addAppointmentToUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: profileInfo.email,
              appointment: newAppointmentUser,
            }),
          }
        );

        const userData = await userResponse.json();

        if (userResponse.ok) {

          showMessage(userData.message, userData.type);
          dispatch(updateAppointments(userData.appointments))
          props.onClose();
        } else {
          console.log(
            "Failed to add appointment to the user:",
            userData.message
          );
        }
      } else {
        console.log("Failed to add appointment:", businessData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // useEffect(() => {
  //   console.log("selectedTime:" + selectedTime);

  // }, [ selectedTime ]);

  // useEffect(() => {
  //   console.log("selectedDate:" + selectedDate);

  // }, [ selectedDate ]);

  useEffect(() => {
    if (selectedService !== null) {
      const start = formattedTime(props.workingHours.start);
      const end = formattedTime(props.workingHours.end);

      let minutes = selectedService.duration * 60;
      let hours = Math.floor(selectedService.duration);
      minutes = minutes - hours * 60;

      const serviceDuration =
        formattedTime(`${hours}:${minutes}`).getHours() * 60 +
        formattedTime(`${hours}:${minutes}`).getMinutes();

      const filteredList = [];
      for (
        let i = start;
        i.getTime() < end.getTime();
        i = new Date(i.getTime() + 60000 * serviceDuration)
      ) {
        let time = {};
        if (
          formattedTime(appointmentsDef.fixedBreak[ 0 ].start).getTime() <=
          i.getTime() &&
          i.getTime() <
          formattedTime(appointmentsDef.fixedBreak[ 0 ].end).getTime()
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

  const formattedTime = (timeString) => {
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

  const setServiceAndShowCalendar = (service) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const servicesShow = () => {
    return (
      <>
        <p className="text-center display-6">Choose a service</p>
        <Services
          businessDetails={ props.businessDetails }
          setServiceAndShowCalendar={ setServiceAndShowCalendar }
        />
      </>
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
            <>
              <p className="text-center display-6">Schedule</p>
              <Calendar
                calendarType="Hebrew"
                locale="en-US"
                value={ selectedDate }
                onChange={ handleDateSelect }
                minDate={ new Date() }
                maxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Show one month forward
                tileDisabled={ ({ date }) => isDayDisabled(date) }
              />
            </>
          ) }
        </div>
      ) }
      <div className="d-flex flex-wrap justify-content-center gap-1">
        { currentStep > 1 && currentStep < 4 && (
          <>
            <div className="">
              { selectedDate && (
                <p className="d-flex justify-content-center fs-6 border border-success rounded-pill ">
                  Available times for { selectedDate.toLocaleDateString() }:
                </p>
              ) }
              { renderAvailableTimes() }

              { selectedTime && (
                <p className="d-flex justify-content-center fs-6 border border-success rounded-pill">
                  You have selected { selectedDate.toLocaleDateString() } at{ " " }
                  { selectedTime }.
                </p>
              ) }
            </div>
          </>
        ) }
      </div>
      { currentStep === 4 && (
        <>
          <p className="text-center display-6">Recommended products</p>
          <Products
            addProduct={ addProduct }
            businessDetails={ props.businessDetails }
            selectedDate={ selectedDate }

          />
          <Cart
            selectedProducts={ selectedProducts }

            onIncrease={ handleIncrease }
            onDecrease={ handleDecrease }
            deleteProductHandler={ deleteProductHandler }
          />
        </>
      ) }
      { currentStep === 5 && (
        <div className="summary-section">
          <Summary
            selectedDate={ selectedDate }
            selectedTime={ selectedTime }
            selectedService={ selectedService }
            selectedProducts={ selectedProducts }
            profileInfo={ profileInfo }
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
