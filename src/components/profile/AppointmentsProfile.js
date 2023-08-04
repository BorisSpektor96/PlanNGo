import { useContext, useState, useEffect } from "react";
import { ProfileInfoContext } from "../../ProfileInfoContext";

import { PopupMessageContext } from './../../PopupMessage';
import AppointmentItem from "./AppointmentItem";
import { AuthContext } from '../../AuthContext'

const AppointmentsProfile = () => {

  const { showMessage } = useContext(PopupMessageContext)
  const { isBusiness } = useContext(AuthContext)
  const [ appointmentRemoved, setAppointmentRemoved ] = useState(false)

  const updateAppointments = () => {
    setAppointmentRemoved(!appointmentRemoved)
  }

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ appointments, setAppointments ] = useState([]);

  useEffect(() => {
    if (isBusiness) {
      getAppointmentsDetailsBusiness()
    } else {
      getAppointmentsDetailsUser()
    }
  }, [ profileInfo ])


  useEffect(() => {
    if (isBusiness) {
      getAppointmentsDetailsBusiness()
    } else {
      getAppointmentsDetailsUser()
    }
  }, [ appointmentRemoved ])

  const getAppointmentsDetailsUser = async () => {
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
        })
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const getAppointmentsDetailsBusiness = async () => {
    try {
      const appointmentsData = await fetch('http://localhost:3001/business/getAppointmentsDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });
      if (appointmentsData.ok) {
        const appointments = await appointmentsData.json()
        setAppointments(appointments)
        appointments.forEach(item => {
          item[ "toggle" ] = false
        })
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div className=" mt-4">
      <div>

      </div>

      <h5 className="d-flex justify-content-center m-1">Appointments</h5>
      <ul className="p-3 list-group list-group-flush">
        { appointments.length > 0 ?
          (<>
            { appointments.map((item) => (
              <AppointmentItem
                updateAppointments={ updateAppointments }
                item={ item }
                profileInfo={ profileInfo }
              />
            )) }
          </>)
          :
          (<>
            <p className="text-center">There is no Appointments</p>
          </>)
        }
      </ul>
    </div>
  )

}

export default AppointmentsProfile