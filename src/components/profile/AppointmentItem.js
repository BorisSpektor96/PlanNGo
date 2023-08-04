import { useState, useEffect, useContext } from "react"
import './appointmentItem.css'
import { AuthContext } from '../../AuthContext'
import { PopupMessageContext } from './../../PopupMessage';


const AppointmentItem = props => {
  const { showMessage } = useContext(PopupMessageContext)
  const { isBusiness } = useContext(AuthContext)

  const [ toggle, setToggle ] = useState(props.item.toggle)
  const date = new Date(props.item.date)
  const service = props.item.service
  const businessDetails = props.item.businessDetails
  const userDetails = props.item.userDetails
  const profileInfo = props.profileInfo

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const removeAppointment = async () => {
    let clientEmail = ''
    let businessEmail = ''
    if (isBusiness) {
      businessEmail = profileInfo.email
      clientEmail = userDetails.email
    } else {
      businessEmail = businessDetails.email
      clientEmail = profileInfo.email
    }

    try {
      const response = await fetch('http://localhost:3001/business/removeAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessEmail: businessEmail,
          date: date,
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
          date: date,
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
    props.updateAppointments()
  }

  return (
    <li className="d-flex flex-wrap justify-content-between align-items-center border rounded border-secondary m-1 p-2">
      {
        !toggle ?
          <div>
            <div className="d-flex flex-wrap">
              <div className="d-flex align-items-center gap-2 me-3 mb-1">
                <h6 className="p-0 m-0">{ !isBusiness ? 'Business:' : 'Client:' } </h6>
                <p className="p-0 m-0"> { isBusiness ? userDetails.name : businessDetails.name }</p>
              </div>
              <div className="d-flex align-items-center gap-2 me-3 mb-1">
                <h6 className="p-0 m-0">Service:</h6>
                <p className="p-0 m-0"> { service.name }</p>
              </div>
              <div className="d-flex align-items-center gap-2 me-3 mb-1">
                <h6 className="p-0 m-0">Time:</h6>
                <p className="p-0 m-0">
                  { `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}` }
                  { ` ${daysOfWeek[ date.getDay() ]}` }
                </p>
              </div>
            </div>
          </div>
          :
          <div className="d-flex flex-column">
            <div className="d-flex flex-wrap justify-content-between">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">{ !isBusiness ? 'Business:' : 'Client:' }  </h6>
                  <p className="p-0 m-0"> { !isBusiness ? businessDetails.name : userDetails.name }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Email:</h6>
                  <p className="p-0 m-0"> { !isBusiness ? businessDetails.email : userDetails.email }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">{ !isBusiness ? 'Address:' : 'Phone:' }</h6>
                  <p className="p-0 m-0"> { !isBusiness ? businessDetails.address : userDetails.phoneNumber }</p>
                </div>
              </div>

              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Service:</h6>
                  <p className="p-0 m-0"> { service.name }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Duration:</h6>
                  <p className="p-0 m-0"> { service.duration }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Price:</h6>
                  <p className="p-0 m-0"> ${ service.price }</p>
                </div>
              </div>

              <div className="">
                <div>
                  <div className="d-flex align-items-center gap-2 me-3 mb-1">
                    <h6 className="p-0 m-0">Date:</h6>
                    <p className="p-0 m-0">{ `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` }</p>
                  </div>
                  <div className="d-flex align-items-center gap-2 me-3 mb-1">
                    <h6 className="p-0 m-0">Time:</h6>
                    <p className="p-0 m-0"> { date.getHours() }:{ date.getMinutes().toString().padStart(2, '0') }</p>
                  </div>
                  <div className="d-flex align-items-center gap-2 me-3 mb-1">
                    <h6 className="p-0 m-0">Day:</h6>
                    <p className="p-0 m-0"> { daysOfWeek[ date.getDay() ] }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


      }

      <div className="d-flex justify-content-center align-items-center gap-2">
        <button
          className={ !toggle ? "btn btn-outline-primary" : "btn btn-primary" }
          onClick={ () => { setToggle(!toggle) } }>
          { !toggle ? "More Info" : "Less Info" }
        </button>
        {
          date.getTime() > new Date().getTime()
            ?
            <button
              className="btn btn-danger"
              onClick={ removeAppointment }
            >
              Cancel
            </button>
            :
            <button
              disabled
              className="btn btn-secondary"
            // onClick={ removeAppointment }
            >
              Passed
            </button>
        }
      </div>
    </li>

  )

}

export default AppointmentItem