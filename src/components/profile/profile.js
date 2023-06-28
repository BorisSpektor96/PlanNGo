import { useState, useContext } from "react"

import { ProfileInfoContext } from '../../ProfileInfoContext';

import ServicesProfile from "./ServicesProfile";
import ProductsProfile from "./ProductsProfile";
import AccountProfile from "./AccountProfile";

import './profile.css'

const Profile = () => {


  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit Handler")
  };

  return (
    <>
      <div className="mt-4 mb-4">
        <AccountProfile />
      </div>

      <div className="mt-4 mb-4">
        <ProductsProfile
        />
      </div>

      <div className="mt-4 mb-4">
        <ServicesProfile />
      </div>
    </>
  )

}
export default Profile