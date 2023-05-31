import { useState } from "react"
import FormInput from "../forms/FormInput"
import ServicesProfile from "./ServicesProfile";
import ProductsProfile from "./ProductsProfile";
import './profile.css'

const Profile = () => {

  const [ editAccountMode, setEditAccountMode ] = useState(false)

  const editHandler = () => {
    setEditAccountMode(!editAccountMode)
  }

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

  const handlerProfileEdit = (e) => {
    setProfileInfo({ ...profileInfo, [ e.target.name ]: e.target.value });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    editHandler()
    console.log("submit Handler")
  };

  const listOfInfoAndInput = [
    {
      id: 'firstname',
      name: 'firstname',
      type: 'text',
      label: 'First name',
      value: profileInfo[ 'firstname' ],
      required: true,
      errorMessage: "",
    },
    {
      id: 'lastname',
      name: 'lastname',
      type: 'text',
      label: 'Last name',
      value: profileInfo[ 'lastname' ],
      required: true,
      errorMessage: "",
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email',
      value: profileInfo[ 'email' ],
      required: true,
      errorMessage: "It should be a valid email address!",
    },

    {
      id: 'businessName',
      name: 'businessName',
      type: 'text',
      label: "Business Name",
      value: profileInfo[ 'businessName' ],
      required: true,
      errorMessage: "",
    },
    {
      id: 'businessAddress',
      name: 'businessAddress',
      type: 'text',
      label: 'Business Address',
      value: profileInfo[ 'businessAddress' ],
      required: true,
      errorMessage: "",
    },
    {
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'tel',
      label: 'Phone number',
      value: profileInfo[ 'phoneNumber' ],
      pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      required: true,
      errorMessage: "It should be a valid phone number!",
    },
  ]

  const showLabelInputList = (
    <form onSubmit={ submitHandler }>
      <div className="card xl-12">
        <div className="card-body d-flex flex-wrap gap-3 justify-content-center">
          { listOfInfoAndInput.map((input, key) => (
            < div className="col-sm-5 d-flex flex-wrap" key={ key } >
              {
                editAccountMode
                  ? <FormInput
                    key={ key }
                    { ...input }
                    onChange={ handlerProfileEdit }
                    onInput={ handlerProfileEdit }
                  />
                  : <div>
                    < label className="form-label" for={ input.id }>{ input.label } </label>
                    <div className="">{ profileInfo[ input.name ] }</div>
                  </div>
              }
            </div>
          ))
          }
          <div className="card-body p-0">

            < label className="form-label" for="BusinessDescription">Business Description: </label>
            { editAccountMode
              ? <textarea rows="5"
                onChange={ handlerProfileEdit }
                name="BusinessDescription"
                value={ profileInfo.BusinessDescription }
                className="form-control"
              />
              : <div className="">
                { profileInfo.BusinessDescription }
              </div>
            }
          </div>
        </div>
        { editAccountMode &&
          <button className="btn btn-primary" type="submit" >Save changes</button>
        }
      </div >
    </form >

  )



  return (
    <>
      <div className="container-xl px-4 mt-4 mb-4">
        <div className="d-flex gap-4 flex-wrap">

          <div className="row">

            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                  <div className="small font-italic text-muted mb-4">
                    <button className="btn btn-primary" type="button">Upload new image</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="row d-flex mb-3">
                <div className="col-6 d-flex align-items-end">
                  <u>Account Details</u>
                </div>
                { !editAccountMode &&
                  <div className="col-6 d-flex justify-content-end">
                    <button className="border btn btn-outline-Wraning" onClick={ editHandler }>
                      <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                      <lord-icon
                        src="https://cdn.lordicon.com/puvaffet.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#2516c7"
                        styles="width:250px;height:250px">
                      </lord-icon>
                    </button>
                  </div>
                }
              </div>
              { showLabelInputList }
            </div>

          </div>

        </div>
      </div >

      <ProductsProfile className
        setProfileInfo={ setProfileInfo }
        submitHandler={ submitHandler }
        profileInfo={ profileInfo }
      />

      <ServicesProfile
        setProfileInfo={ setProfileInfo }
        submitHandler={ submitHandler }
        profileInfo={ profileInfo }
      />
    </>
  )

}
export default Profile