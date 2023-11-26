import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../UI/Modal";
import Products from "./products/Products";
import Services from "./Services";
import Summary from "./Summary";
import { PopupMessageContext } from "../../PopupMessage";
import Cart from "./cart/Cart";
import { sendMessage, createMessage } from '../messages/messageService';
import ButtonSection from "./ButtonSection"
import { useSelector, useDispatch } from "react-redux";
import { updateAppointments } from "../../profileInfoSlice";
import { updateMessages } from "../../profileInfoSlice";

import { incrementProductQuantityHandler, decrementProductQuantityHandler } from "./products/productService";

import dayjs from 'dayjs';

const AppointmentCalendar = (props) => {

  const profileInfo = useSelector(state => state.profileInfo)
  const dispatch = useDispatch()

  const { showMessage } = useContext(PopupMessageContext);
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ selectedTime, setSelectedTime ] = useState(null);
  const [ selectedService, setSelectedService ] = useState(null);
  const [ timeList, setTimeList ] = useState([]);

  const appointmentsDef = props.appointmentsDef;

  const handleDateSelect = async (date) => {
    if (selectedTime !== null) {
      await createDeleteDate()
      await props.handleRemoveLockAppointment(deleteDate)
    }
    setSelectedTime(null)
    setSelectedDate(new Date(date));
    props.onStepChange(2);
  };

  const handleLockAppointmentTemp = async () => {
    const newAppointmentBusiness = {
      type: "lock",
      date: new Date(selectedDate),
      userDetails: {
        email: profileInfo.email,
      },
    }

    if (selectedTime !== null) {
      newAppointmentBusiness.date.setHours(parseInt(selectedTime.slice(0, 2)));
      newAppointmentBusiness.date.setMinutes(parseInt(selectedTime.slice(3, 5)));
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
    }
    catch (error) {
      console.log("Error:", error.message);
    }
  }

  const handleTimeSelect = async (time) => {
    if (selectedTime !== null) {
      await createDeleteDate()
      await props.handleRemoveLockAppointment(deleteDate)
    }
    setSelectedTime(time);
    props.onStepChange(3);
  };

  useEffect(() => {
    if (selectedTime !== null) {
      handleLockAppointmentTemp();
    }
  }, [ selectedTime ])

  const handleBack = async () => {
    if (props.currentStep === 1 || props.currentStep === 2 || props.currentStep === 3) {
      props.onStepChange(0);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedService(null)
      props.setCartList([])
    } else if (props.currentStep === 4) {
      if (props.cartList.length > 0) {
        try {
          await props.sendCartListToServer(props.cartList);
          console.log("Cart list sent to the server:", props.cartList);
        } catch (error) {
          console.error("Error sending cart list to server:", error);
        }
      }
      await createDeleteDate()
      await props.handleRemoveLockAppointment(deleteDate)
      setSelectedTime(null);
      props.onStepChange(1);
      props.setCartList([])
    } else if (props.currentStep === 5) {
      props.onStepChange(4);
    }
  };
  let deleteDate = {
    type: "",
    date: null,
    businessEmail: "",
    userEmail: "",
  }
  const createDeleteDate = async () => {
    deleteDate.type = "lock"
    deleteDate.date = new Date(selectedDate)
    deleteDate.businessEmail = props.businessDetails.email
    deleteDate.userEmail = profileInfo.email
    deleteDate.date.setHours(parseInt(selectedTime.slice(0, 2)));
    deleteDate.date.setMinutes(parseInt(selectedTime.slice(3, 5)));
  }

  const isDayDisabled = (date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const isoDayDate = date.toISOString().split('T')[ 0 ];
    let oneTimeDates = []
    if (appointmentsDef.OneTimeDayOff) {
      oneTimeDates = appointmentsDef.OneTimeDayOff.map(dateTime => dateTime);
    }
    return (
      appointmentsDef.fixedDaysOff.includes(dayName) ||
      oneTimeDates.includes(dayjs(isoDayDate).add(1, 'day').format('YYYY-MM-DD'))
    );
  };

  const addProduct = (product) => {
    const updatedProducts = [ ...props.cartList ];
    const existingProductIndex = updatedProducts.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      updatedProducts[ existingProductIndex ].amount++;
    } else {
      updatedProducts.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        amount: 1,
        photo: product.photo,
      });
    }
    handleIncrease(product._id)
    props.setCartList(updatedProducts)
  };

  const handleIncrease = async (productId) => {
    props.setCartList((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, amount: product.amount + 1 }
          : product
      )
    )
    await decrementProductQuantityHandler(productId, 1, props.businessDetails.email)
  };

  const handleDecrease = async (productId) => {
    props.setCartList((prevProducts) =>
      prevProducts
        .map((product) =>
          product._id === productId
            ? { ...product, amount: product.amount - 1 }
            : product
        )
        .filter((product) => product.amount > 0) // Remove products with amount 0
    );
    await incrementProductQuantityHandler(productId, 1, props.businessDetails.email)
  };

  const deleteProductHandler = async (product) => {
    const productQuantityBack = []
    productQuantityBack.push(product)
    await props.sendCartListToServer(productQuantityBack)
    props.setCartList((prevProducts) =>
      prevProducts.filter((p) => p._id !== product._id)
    );
  };

  const currentDate = new Date();
  const status = "received";
  const read = false;
  let subject = ""
  let content = ""

  if (props.currentStep > 4) {
    subject = `New appointment at: ${selectedDate.toLocaleDateString()}`;
    content = `Appointment Summary:\n\n`;
    content += `Date: ${selectedDate.toLocaleDateString()}\n`;
    content += `Time: ${selectedTime}\n`;
    content += `Service: ${selectedService.name}\n`;
    content += `Total: ${props.cartList.reduce((total, product) => total + product.price * product.amount, 0) + selectedService.price}$\n`
    content += `Business Phone: ${props.businessDetails.phoneNumber}\n`;
    content += `Business Address: ${props.businessDetails.address}\n\n`;
  }

  const sendMessageToBusiness = async () => {
    try {
      const messageData = createMessage(
        read,
        profileInfo.email,
        currentDate.toISOString(),
        content,
        status,
        subject,
        true
      );
      const response = await sendMessage(props.businessDetails.email, messageData, true);

    } catch (error) {
      console.log("Error:", error);
      showMessage("Failed to send message to business", "Error");
    }
  }
  const sendMessageToUser = async () => {

    try {
      const messageData = createMessage(
        read,
        props.businessDetails.email,
        currentDate.toISOString(),
        content,
        status,
        subject,
        false,
      );

      const response = await sendMessage(profileInfo.email, messageData, false);

      if (response) {
        dispatch(updateMessages(response.messages));
      }
    } catch (error) {
      console.log("Error:", error);
      showMessage("Failed to send message to business", "Error");
    }
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

    if (props.cartList.length > 0) {
      newAppointmentUser.purchase = props.cartList;
      newAppointmentBusiness.purchase = props.cartList;
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
      // await createDeleteDate()
      // await props.handleRemoveLockAppointment(deleteDate);

      if (businessResponse.ok) {
        await sendMessageToBusiness();
        // showMessage(businessData.message, businessData.type);
        // props.onClose();

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
        // await createDeleteDate()
        // await props.handleRemoveLockAppointment(deleteDate)
        if (userResponse.ok) {
          await sendMessageToUser();
          showMessage(userData.message, userData.type);
          dispatch(updateAppointments(userData.appointments))
          // props.onClose();
        } else {
          console.log(
            "Failed to add appointment to the user:",
            userData.message
          );
        }
      } else {
        console.log("Failed to add appointment:", businessData.message);
      }
      console.log("schedule")
      createDeleteDate()
      props.handleRemoveLockAppointment(deleteDate)
      props.onClose();

    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    if (selectedService !== null && selectedDate !== "") {
      const start = new Date();
      const end = new Date();
      const currentDate = new Date();

      if (
        selectedDate.getDate() === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
      ) {
        start.setHours(start.getHours() + 3);
        start.setMinutes(0);
      } else {
        start.setTime(formattedTime(props.workingHours.start).getTime());
      }

      end.setTime(formattedTime(props.workingHours.end).getTime());

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
      setTimeList(filteredList);
    } else {
      setSelectedDate("");
    }
  }, [ selectedService, selectedDate ]);

  const formattedTime = (timeString) => {
    if (!selectedDate) {
      return null; // Return null or some default value when selectedDate is not set
    }

    const selectedDateObj = new Date(selectedDate);
    const [ hours, minutes ] = timeString.split(":").map(Number);
    selectedDateObj.setHours(hours, minutes, 0);
    return selectedDateObj;
  };

  const isAppointmentExist = (time, date) => {
    const selectedDateTime = new Date(date);
    const formattedTime = time.split(":");
    selectedDateTime.setHours(formattedTime[ 0 ], formattedTime[ 1 ], 0);

    const appointments = props.appointmentsDef.appointments;
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
    props.onStepChange(1);
  };

  const exitCalendar = () => {
    createDeleteDate()
    console.log(deleteDate)
    props.onClose(deleteDate)
  }

  return (
    <Modal onClose={ exitCalendar }>
      <div class="d-flex flex-row justify-content-end p-1 w-100 ">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          dal
          onClick={ exitCalendar }
        ></button>
      </div>

      <Services
        businessDetails={ props.businessDetails }
        setServiceAndShowCalendar={ setServiceAndShowCalendar }
        currentStep={ props.currentStep }
      />

      <div className="d-flex flex-column flex-wrap align-items-center gap-1 pb-2">
        { props.currentStep > 0 && props.currentStep < 4 && (
          <>
            <p className="text-center display-6">Schedule</p>
            <Calendar
              calendarType="hebrew"
              locale="en-US"
              value={ selectedDate }
              onChange={ handleDateSelect }
              minDate={ new Date() }
              mraxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Show one month forward
              tileDisabled={ ({ date }) => isDayDisabled(date) }
            />
          </>
        ) }
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-1">
        { props.currentStep > 1 && props.currentStep < 4 && (
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

      <Products
        addProduct={ addProduct }
        productList={ props.businessDetails.products }
        currentStep={ props.currentStep }
        serviceName={ selectedService ? selectedService.name : null }
      />

      <Cart
        selectedProducts={ props.cartList }
        onIncrease={ handleIncrease }
        onDecrease={ handleDecrease }
        deleteProductHandler={ deleteProductHandler }
        currentStep={ props.currentStep }
      />

      <Summary
        selectedDate={ selectedDate }
        selectedTime={ selectedTime }
        selectedService={ selectedService }
        selectedProducts={ props.cartList }
        profileInfo={ profileInfo }
        businessDetails={ props.businessDetails }
        currentStep={ props.currentStep }
      />

      <ButtonSection
        currentStep={ props.currentStep }
        onBackClick={ () => handleBack() }
        onScheduleClick={ () => scheduleHandler() }
        onContinueClick={ () => props.onStepChange(props.currentStep + 1) }
      />
    </Modal>
  );
};

export default AppointmentCalendar;