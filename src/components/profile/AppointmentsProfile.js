import { useContext, useState } from "react";
import { ProfileInfoContext } from "../../ProfileInfoContext";
import { useEffect } from "react";

import { PopupMessageContext } from './../../PopupMessage';
import AppointmentItem from "./AppointmentItem";

const AppointmentsProfile = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ appointments, setAppointments ] = useState([
    {
      date: "2023-07-28T08:30:00.000Z",
      service: {
        serviceType: "hair",
        name: "mans hair cut",
        price: "35",
        duration: "0.5",
        id: 1
      },
      businessDetails: {
        name: "johns barber shop",
        email: "john.doe@example.com",
        address: "123 Main Street, Cityville, Haifa"
      }
    }
  ]);

  return (
    <div class="d-flex justify-content-center mt-4">
      <ul className="p-3 border border-primary rounded list-group list-group-flush">
        <p class="d-flex justify-content-center m-1">Appointments</p>
        { appointments.length > 0 ?
          (<>
            { appointments.map((item) => (
              <AppointmentItem
                item={ item }
              // key={ item.id }
              // id={ item.id }
              // name={ item.business_name }
              // service={ item.businessType }
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