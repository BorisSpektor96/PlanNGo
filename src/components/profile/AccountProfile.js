import { useState, useContext, useEffect } from "react"
import FormInput from "../forms/FormInput"
import './profile.css'
import { ProfileInfoContext } from '../../ProfileInfoContext';

const AccountProfile = () => {

  const [ editAccountMode, setEditAccountMode ] = useState(false)

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);
  const [ profile, setProfile ] = useState({
    fullname: "",
    email: "",
    address: "",
    business_name: "",
    personal_phone: "",
    business_description: ""
  });

  const editHandler = () => {
    setEditAccountMode(!editAccountMode)
  }

  const handlerInputProfileEdit = (e) => {
    setLocalProfileInfo({
      ...localProfileInfo,
      [ e.target.name ]: e.target.value
    });
  };

  // useEffect(() => {
  //   setLocalProfileInfo(profile)
  // }, [ profile ])

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/business/getBusinessProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });

      if (response.ok) {
        const user = await response.json();
        if (user !== null) {
          setProfile(user)
        } else {
          setProfile(user)
        }
      } else {
        setProfile({})
      }
    } catch (error) {
      console.log('Error:', error);
      setProfile({})
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [ profileInfo.email ]);

  const submitAccountForm = async (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value
    const email = e.target.email.value
    const business_name = e.target.business_name.value
    const address = e.target.address.value
    const personal_phone = e.target.personal_phone.value
    const business_description = e.target.business_description.value

    await updateProfile(fullname, email, business_name, address, personal_phone, business_description)
    // await fetchProfile()
    // await dispatch({ type: 'UPDATE_PROFILE_INFO', payload: localProfileInfo });
    setEditAccountMode(!editAccountMode);
    // console.log(profileInfo)
  };

  const updateProfile = async (fullname, email, business_name, address, phone, description) => {
    try {
      const response = await fetch('http://localhost:3001/business/updateUserProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profileInfo.email,
          fullname: fullname,
          emailNew: email,
          business_name: business_name,
          address: address,
          business_phone: phone,
          business_description: description
        })
      });
      console.log(response)

      if (response.ok) {
        const newProfile = await response.json();
        console.log(newProfile)
        if (newProfile !== null) {
          setProfile(newProfile)
        } else {
          setProfile(newProfile)
        }
      } else {
        console.log("not ok ")
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // useEffect(() => {
  //   dispatch({ type: 'UPDATE_PROFILE_INFO', payload: localProfileInfo });
  //   // setLocalProfileInfo(JSON.parse(localStorage.getItem('userData')));
  // }, [ localProfileInfo ])

  const listOfInfoAndInput = [
    {
      id: 'fullname',
      name: 'fullname',
      type: 'text',
      label: 'fullname',
      required: true,
      errorMessage: "",
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      errorMessage: "It should be a valid email address!",
    },
    {
      id: 'business_name',
      name: 'business_name',
      type: 'text',
      label: "Business Name",
      required: true,
      errorMessage: "",
    },
    {
      id: 'address',
      name: 'address',
      type: 'text',
      label: 'Business Address',
      required: true,
      errorMessage: "",
    },
    {
      id: 'personal_phone',
      name: 'personal_phone',
      type: 'tel',
      label: 'Phone number',
      pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      required: true,
      errorMessage: "It should be a valid phone number!",
    },
    {
      id: 'business_description',
      name: 'business_description',
      type: 'text',
      label: 'Business Description',
      required: true,
      errorMessage: "It should be a valid phone number!",
    },
  ]

  const showLabelInputList = (
    <form onSubmit={ submitAccountForm }>
      <div className="col-xl-12">
        <div className="row gap-3 mb-3 justify-content-center">

          { listOfInfoAndInput.map((input, key) => (
            < div className="" key={ key } >
              {
                editAccountMode
                  ? <FormInput
                    key={ key }
                    { ...input }
                    value={ localProfileInfo[ input.name ] }
                    onChange={ handlerInputProfileEdit }
                  />
                  :
                  <div className="">
                    < label className="form-label" for={ input.id }>{ input.label } </label>
                    <div className="">{ localProfileInfo[ input.name ] }</div>
                  </div>
              }
            </div>
          ))
          }
          {/* <div className="card-body p-3">

            { editAccountMode
              ? <div>
                < label className="form-label" for="business_description">Business Description: </label>
                <textarea rows="5"
                  value={ localProfileInfo.business_description }
                  onChange={ handlerInputProfileEdit }
                  className="form-control"
                  name="business_description"
                />
              </div>
              : <div className="d-flex flex-column align-items-center justify-content-center">
                < label className="form-label" for="BusinessDescription">Business Description: </label>
                <div>
                  <p className="d-flex">
                    { localProfileInfo.business_description }
                  </p>
                </div>
              </div>
            }
          </div> */}
        </div>
        { editAccountMode &&
          <div className="d-flex justify-content-center ">
            <button className="mb-3 text-center btn btn-primary" type="submit" >Save changes</button>
          </div>
        }
      </div >
    </form >
  )

  return (

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

          <div className="card col-xl-8 ">
            <div className="card-header d-flex justify-content-around mb-3">
              <div className="d-flex align-items-center">
                Account Details
              </div>
              { !editAccountMode &&
                <div className="d-flex justify-content-end">
                  <button className="border-0" onClick={ editHandler }>
                    <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                    <lord-icon
                      src="https://cdn.lordicon.com/puvaffet.json"
                      trigger="loop"
                      stroke="85"
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
  )

}

export default AccountProfile