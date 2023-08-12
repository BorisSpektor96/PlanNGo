import { useContext, useState } from "react";
import FavoriteItem from "./FavoriteItem";
import "./favoritesList.css"
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from "../../profileInfoSlice";
import { PopupMessageContext } from './../../PopupMessage';

const FavoritesList = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const profileInfo = useSelector(state => state.profileInfo)
  const dispatch = useDispatch()

  const deleteFavoriteHandler = async (favId) => {
    try {
      const response = await fetch('http://localhost:3001/users/deleteFromFavoriteById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: profileInfo.email, favoriteId: favId })
      });

      if (response.ok) {
        const data = await response.json()
        dispatch(updateFavorites(data.favorites))
        showMessage(data.message, data.type)
      }
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
            { profileInfo.favorites.map((item) => (
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
            <p className="text-center">There is no favorite businesses</p>
          </>)
        }
      </ul>
    </div>
  );

}
export default FavoritesList;