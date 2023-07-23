import ServicesProfile from "./ServicesProfile";
import ProductsProfile from "./ProductsProfile";
import AccountProfile from "./AccountProfile";

import './profile.css'
import { useEffect, useContext } from "react";
import { ProfileInfoContext } from '../../ProfileInfoContext'

const Profile = () => {

  const { dispatch } = useContext(ProfileInfoContext);

  useEffect(() => {
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: JSON.parse(localStorage.getItem('userData')) });
  }, [])

  return (
    < >
      <div className="mt-4 mb-4" >
        <AccountProfile
        />
      </div >

      <div className="mt-4 mb-4">
        <ServicesProfile
        />
      </div>

      <div className="mt-4 mb-4">
        <ProductsProfile
        />
      </div>
    </ >
  )
}

export default Profile