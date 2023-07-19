import { useContext, useState } from "react";
import FavoriteItem from "./FavoriteItem";
import "./favoritesList.css"
import { ProfileInfoContext } from "../../ProfileInfoContext";
import { useEffect } from "react";

const FavoritesList = () => {

  const { profileInfo } = useContext(ProfileInfoContext);

  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
    fetchFavorites()
  }, [ profileInfo.email ])

  const fetchFavorites = async () => {
    console.log("profileInfo.email", profileInfo.email)
    try {
      const response = await fetch('http://localhost:3001/users/getFavorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });
      if (response.ok) {
        const favoritesData = await response.json();

        if (favoritesData !== null) {
          setFavorites(favoritesData);
        } else {
          setFavorites(favoritesData);
        }
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.log('Error:', error);
      setFavorites([]);
    }
  };

  const deleteFavoriteHandler = async (favId) => {
    try {
      const response = await fetch('http://localhost:3001/users/deleteFromFavoriteById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: profileInfo.email, favoriteId: favId })
      });

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          fetchFavorites();
          alert(data.message)
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div class="d-flex justify-content-center mt-4">
      <ul className="border border-primary rounded list-group list-group-flush">
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
  );

}
export default FavoritesList;