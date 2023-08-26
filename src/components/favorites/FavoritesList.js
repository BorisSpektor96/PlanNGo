import { useContext, useEffect, useState } from "react";
import FavoriteItem from "./FavoriteItem";
import "./favoritesList.css"
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from "../../profileInfoSlice";
import { PopupMessageContext } from './../../PopupMessage';

import { deleteBusinessFromFavorites } from './FavoriteService';

const FavoritesList = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const profileInfo = useSelector(state => state.profileInfo)
  const dispatch = useDispatch()

  const deleteFavoriteHandler = async (businessEmail) => {
    try {
      const data = await deleteBusinessFromFavorites(profileInfo.email, businessEmail)

      showMessage(data.message, data.type)
      dispatch(updateFavorites(data.favorites))
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div class="justify-content-center mt-4">
      <h5 className="d-flex justify-content-center m-1">Favorite Businesses</h5>
      <ul className="p-3 list-group list-group-flush">
        { profileInfo.favorites && profileInfo.favorites.length > 0 ?
          (<>
            { profileInfo.favorites.map((Business) => (
              <FavoriteItem
                key={ Business.id }
                deleteFavItem={ deleteFavoriteHandler }
                { ...Business }
              />
            )) }
          </>)
          :
          (<>
            <p className="text-center">There is no favorite businesses</p>
          </>)
        }
      </ul>
    </div>
  );

}
export default FavoritesList;