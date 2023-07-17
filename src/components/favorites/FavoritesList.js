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
    console.log(favorites)
  }, [ profileInfo.email ])

  useEffect(() => {
    console.log(profileInfo)
  }, []);

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
        fetchFavorites();
        alert('favorite is successfully deleted')
      } else {
        alert('Failed to delete favorite business');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div class="d-flex justify-content-center mt-4">
      <ul className="border list-group list-group-flush">
        <p class="d-flex justify-content-center m-1">Favorites</p>
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