import { useState, useContext } from "react"
import { AuthContext } from '../../AuthContext'
import { useSelector } from "react-redux";

const AppointmentItem = ({ item, removeAppointment }) => {

  const profileInfo = useSelector(state => state.profileInfo)
  const { isBusiness } = useContext(AuthContext)

  const [ toggle, setToggle ] = useState(item.toggle)

  const date = new Date(item.date)
  let appointmentDetails = !isBusiness ? item.businessDetails : item.userDetails
  const appointment = {
    date: new Date(item.date),
    service: item.service,
    appointmentEmail: appointmentDetails.email,
    userEmail: profileInfo.email
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
                <p className="p-0 m-0">  { !isBusiness ? appointmentDetails.name : appointmentDetails.name }</p>
              </div>
              <div className="d-flex align-items-center gap-2 me-3 mb-1">
                <h6 className="p-0 m-0">Service:</h6>
                <p className="p-0 m-0">  { appointment.service.name }</p>
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
                  <p className="p-0 m-0">  { !isBusiness ? appointmentDetails.name : appointmentDetails.name }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Email:</h6>
                  <p className="p-0 m-0">  { !isBusiness ? appointmentDetails.email : appointmentDetails.email }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">{ !isBusiness ? 'Address:' : 'Phone:' }</h6>
                  <p className="p-0 m-0">  { !isBusiness ? appointmentDetails.address : appointmentDetails.phoneNumber }</p>
                </div>
              </div>

              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Service:</h6>
                  <p className="p-0 m-0"> { appointment.service.name }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Duration:</h6>
                  <p className="p-0 m-0"> { appointment.service.duration }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Price:</h6>
                  <p className="p-0 m-0"> ${ appointment.service.price }</p>
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