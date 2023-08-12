import { useState, useEffect, useContext } from "react"
import './appointmentItem.css'
import { AuthContext } from '../../AuthContext'
import { PopupMessageContext } from './../../PopupMessage';

import { useSelector } from "react-redux";


const AppointmentItem = ({ item, removeAppointment }) => {

  const profileInfo = useSelector(state => state.profileInfo)
  const { showMessage } = useContext(PopupMessageContext)
  const { isBusiness } = useContext(AuthContext)

  const [ toggle, setToggle ] = useState(item.toggle)

  const date = new Date(item.date)
  const service = item.service
  const businessDetails = item.businessDetails
  const userDetails = item.userDetails

  const appointment = {
    date: new Date(item.date),
    service: item.service,
    businessEmail: isBusiness ? profileInfo.email : item.businessDetails.email,
    userEmail: userDetails?.email
  }
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return (
    <li className="d-flex flex-wrap justify-content-between align-items-center border rounded border-secondary m-1 p-2">
      {
        !toggle ?
          <div>
            <div className="d-flex flex-wrap">
              <div className="d-flex align-items-center gap-2 me-3 mb-1">
                <h6 className="p-0 m-0">{ !isBusiness ? 'Business:' : 'Client:' } </h6>
                <p className="p-0 m-0">  { isBusiness ? userDetails?.name : businessDetails?.name }</p>
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
                  <p className="p-0 m-0"> { isBusiness ? businessDetails.email : userDetails.email }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">{ !isBusiness ? 'Address:' : 'Phone:' }</h6>
                  <p className="p-0 m-0"> { isBusiness ? businessDetails.address : userDetails.phoneNumber }</p>
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
              onClick={ () => removeAppointment(appointment) }
            >
              Cancel
            </button>
            :
            <button
              disabled
              className="btn btn-secondary"
            >
              Passed
            </button>
        }
      </div>
    </li>

  )

}

export default AppointmentItem