import ServicesProfile from "./ServicesProfile";
import ProductsProfile from "./ProductsProfile";
import AccountProfile from "./AccountProfile";

import './profile.css'

const Profile = () => {

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