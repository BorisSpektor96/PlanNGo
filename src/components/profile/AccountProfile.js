import { useState, useContext, useEffect } from "react"
import FormInput from "../forms/FormInput"
import './profile.css'
import { ProfileInfoContext } from '../../ProfileInfoContext';

const AccountProfile = () => {

  const [ editAccountMode, setEditAccountMode ] = useState(false)

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ localProfileInfo, setLocalProfileInfo ] = useState(ProfileInfoContext);

  const [ profile, setProfile ] = useState({
    fullname: "state",
    email: "state@state.com",
    address: "state street city",
    business_name: "useState",
    personal_phone: "123465789",
    business_description: "saddsa"
  });

  const editHandler = () => {
    setEditAccountMode(!editAccountMode)
  }

  const handlerInputProfileEdit = (e) => {
    setLocalProfileInfo({
      ...localProfileInfo,
      [ e.target.name ]: e.target.value
    });
    setProfile({
      ...profile,
      [ e.target.name ]: e.target.value
    })
  };

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
          setLocalProfileInfo(profileInfo)
        } else {
          setProfile(user)
          setLocalProfileInfo(profileInfo)
        }
      } else {
        setProfile({})
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [ profileInfo.email ]);

  const submitAccountForm = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value
    const email = e.target.email.value
    const business_name = e.target.business_name.value
    const address = e.target.address.value
    const personal_phone = e.target.personal_phone.value
    const business_description = e.target.business_description.value

    setEditAccountMode(!editAccountMode);
    updateProfile(fullname, email, business_name, address, personal_phone, business_description)
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

      if (response.ok) {
        const newProfile = await response.json();
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

  useEffect(() => {
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: localProfileInfo });
  }, [])

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
      id: 'personal_phone',
      name: 'personal_phone',
      type: 'tel',
      label: 'Phone number',
      pattern: '^[+]?[(]?[0-9]{3}[)]?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4,6}$',
      required: true,
      errorMessage: "It should be a valid phone number!",
    },
    {
      id: 'address',
      name: 'address',
      type: 'text',
      label: 'Address',
      required: true,
      errorMessage: "",
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
      <div>

        <div className="row gap-3 ps-3 mb-3 justify-content-center">
          { listOfInfoAndInput.map((input, key) => (
            <div className="" key={ key }>
              { input.name !== 'business_name' && input.name !== 'business_description' && !profileInfo.isBusiness ? (
                editAccountMode ? (
                  <FormInput
                    key={ key }
                    { ...input }
                    value={ localProfileInfo[ input.name ] }
                    onChange={ handlerInputProfileEdit }
                  />
                ) : (
                  <div className="">
                    <label className="form-label" htmlFor={ input.id }>
                      { input.label }
                    </label>
                    <div className="">{ localProfileInfo[ input.name ] }</div>
                  </div>
                )
              ) : null }
            </div>
          )) }
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

          <div className="d-flex col-md-5">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img className="img-fluid rounded-circle mb-4" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                <div className="small font-italic text-muted mb-4">
                  <button className="btn btn-primary" type="button">Upload new image</button>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex col-md-7">
            <div className="card">
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
      </div>
    </div >
  )

}

export default AccountProfile