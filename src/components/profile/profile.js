import ServicesProfile from "./ServicesProfile";
import ProductsProfile from "./ProductsProfile";
import AccountProfile from "./AccountProfile";

import './profile.css'
import { useState, useEffect, useContext } from "react";
import { ProfileInfoContext } from '../../ProfileInfoContext'

const Profile = () => {

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);

  useEffect(() => {
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: JSON.parse(localStorage.getItem('userData')) });
    // setLocalProfileInfo(JSON.parse(localStorage.getItem('userData')));
    // console.log(localProfileInfo)
    console.log(profileInfo)
  }, [])

  return (
    <>
      <div className="mt-4 mb-4">
        <AccountProfile
          localProfileInfo={ localProfileInfo }
        />
      </div>

      <div className="mt-4 mb-4">
        <ProductsProfile
          localProfileInfo={ localProfileInfo }
        />
      </div>

      <div className="mt-4 mb-4">
        <ServicesProfile
          localProfileInfo={ localProfileInfo }
        />
      </div>
    </>
  )

}
export default Profile