import { useState } from "react"
import ServicesProfile from "./ServicesProfile";
import ProductsProfile from "./ProductsProfile";
import AccountProfile from "./AccountProfile";
import './profile.css'

const Profile = () => {

  const [ profileInfo, setProfileInfo ] = useState({
    firstname: "Boris",
    lastname: "Spektor",
    email: "mail@gmail.com",
    businessAddress: "Israel TLV",
    businessName: "Something",
    BusinessDescription: "Lorem Ipsum is simply dummy text of the printing",
    phoneNumber: "05412345678",
    images: [],
    products: [
      {
        id: "1",
        name: "product name1",
        quantity: 5,
        price: 123,
        description: "lorem ipsu111111m dular lorem ipsum dular",
        image: "",
      },
      {
        id: "2",
        name: "product name2",
        quantity: 52,
        price: 444,
        description: "lorem22222 ipsum dular lorem ipsum dular",
        image: "",
      },
    ],
    services: [
      {
        id: "1",
        name: "service name1",
        duration: "30",
        price: 4,
        description: "11111 ipsum dular lorem ipsum dular",
        type: "sometype1",
      },
      {
        id: "2",
        name: "service name2",
        duration: "60",
        price: 444,
        description: "lorem22222 ipsum dular lorem ipsum dular",
        type: "sometype2",
      },
    ],
  })

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit Handler")
  };

  return (
    <>
      <div className="mt-4 mb-4">
        <AccountProfile
        // setProfileInfo={ setProfileInfo }
        // submitHandler={ submitHandler }
        // profileInfo={ profileInfo }
        />
      </div>
      <div className="mt-4 mb-4">
        <ProductsProfile
          setProfileInfo={ setProfileInfo }
          submitHandler={ submitHandler }
          profileInfo={ profileInfo }
        />
      </div>
      <div className="mt-4 mb-4">
        <ServicesProfile
          setProfileInfo={ setProfileInfo }
          submitHandler={ submitHandler }
          profileInfo={ profileInfo }
        />
      </div>
    </>
  )

}
export default Profile