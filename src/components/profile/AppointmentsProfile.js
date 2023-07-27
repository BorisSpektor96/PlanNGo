import { useContext, useState } from "react";
import FavoriteItem from "./FavoriteItem";
import "./favoritesList.css"
import { ProfileInfoContext } from "../../ProfileInfoContext";
import { useEffect } from "react";

import { PopupMessageContext } from './../../PopupMessage';

const AppointmentsProfile = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ appointments, setAppointments ] = useState([]);

  return (
    <div class="d-flex justify-content-center mt-4">
      <ul className="p-3 border border-primary rounded list-group list-group-flush">
        <p class="d-flex justify-content-center m-1">Favorite Businesses</p>
        { favorites.length > 0 ?
          (<>
            { favorites.map((item) => (
              <FavoriteItem
                key={ item.id }
                id={ item.id }
                name={ item.business_name }
                service={ item.businessType }
                deleteFavItem={ deleteFavoriteHandler }
              />
            )) }
          </>)
          :
          (<>
            <p>There is no favorite businesses</p>
          </>)
        }
      </ul>
    </div>
  )

}

export default AppointmentsProfile