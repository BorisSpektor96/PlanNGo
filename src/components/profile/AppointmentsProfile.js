import { useContext, useState, useEffect } from "react";
import { ProfileInfoContext } from "../../ProfileInfoContext";

import { PopupMessageContext } from './../../PopupMessage';
import AppointmentItem from "./AppointmentItem";

const AppointmentsProfile = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ appointments, setAppointments ] = useState([]);

  useEffect(() => {
    getAppointmentsDetails()
  }, [])

  const getAppointmentsDetails = async () => {
    try {
      const appointmentsData = await fetch('http://localhost:3001/users/getAppointmentsDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });

      if (appointmentsData.ok) {
        const appointment = await appointmentsData.json()
        setAppointments(appointment.appointments)
        appointments.forEach(item => {
          item[ "toggle" ] = false
          console.log(item)
        })
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }



  return (
    <div class=" justify-content-center mt-4">
      <p class="d-flex justify-content-center m-1">Appointments</p>
      <ul className=" list-group-flush">
        { appointments.length > 0 ?
          (<>
            { appointments.map((item) => (
              <AppointmentItem
                item={ item }
                profileInfo={ profileInfo }
              />
            )) }
          </>)
          :
          (<>
            <p>There is no Appointments</p>
          </>)
        }
      </ul>
    </div>
  )

}

export default AppointmentsProfile