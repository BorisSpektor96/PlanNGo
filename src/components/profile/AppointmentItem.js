import { useState, useEffect } from "react"
import './appointmentItem.css'


const AppointmentItem = props => {
  const [ toggle, setToggle ] = useState(props.item.toggle)
  const date = new Date(props.item.date)
  const service = props.item.service
  const businessDetails = props.item.businessDetails
  const profileInfo = props.profileInfo

  useEffect(() => {
    console.log(props.item)
  }, [])

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
    try {
      const response = await fetch('http://localhost:3001/users/removeAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profileInfo.email,
          date: date,
          businessEmail: businessDetails.email
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user !== null) {
          console.log(data.user)
        }
      } else {
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <>
      <li className="d-flex flex-wrap justify-content-between align-items-center border rounded border-secondary m-1 p-2">
        {
          !toggle ?
            <div>
              <div className="d-flex flex-wrap">
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Business: </h6>
                  <p className="p-0 m-0"> { businessDetails.name }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Service:</h6>
                  <p className="p-0 m-0"> { service.name }</p>
                </div>
                <div className="d-flex align-items-center gap-2 me-3 mb-1">
                  <h6 className="p-0 m-0">Time:</h6>
                  <p className="p-0 m-0">{ `
                    ${date.getDate()}/${date.getMonth()}/${date.getFullYear()},
                    ${daysOfWeek[ date.getDay() ]} at
                    ${date.getHours()}:${date.getMinutes()} 
                    `
                  }</p>
                </div>
              </div>
            </div>
            :
            <div className="d-flex flex-column">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 me-3 mb-1">
                    <h6 className="p-0 m-0">Business: </h6>
                    <p className="p-0 m-0"> { businessDetails.name }</p>
                  </div>
                  <div className="d-flex align-items-center gap-2 me-3 mb-1">
                    <h6 className="p-0 m-0">Email:</h6>
                    <p className="p-0 m-0"> { businessDetails.email }</p>
                  </div>
                  <div className="d-flex align-items-center gap-2 me-3 mb-1">
                    <h6 className="p-0 m-0">Address:</h6>
                    <p className="p-0 m-0"> { businessDetails.address }</p>
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
                      <p className="p-0 m-0">{ date.getDate() }/{ date.getMonth() }/{ date.getFullYear() }</p>
                    </div>
                    <div className="d-flex align-items-center gap-2 me-3 mb-1">
                      <h6 className="p-0 m-0">Time:</h6>
                      <p className="p-0 m-0"> { date.getHours() }:{ date.getMinutes() }</p>
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
          <button
            className="btn btn-danger"
          >
            Cancle
          </button>
        </div>
      </li>
    </>

  )

}

export default AppointmentItem