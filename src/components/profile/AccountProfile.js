import { useState, useContext, useEffect } from "react"
import FormInput from "../forms/FormInput"
import './profile.css'
import { ProfileInfoContext } from '../../ProfileInfoContext';
import FavoritesList from "../favorites/FavoritesList";
import { PopupMessageContext } from "../../PopupMessage";

const AccountProfile = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const [ editAccountMode, setEditAccountMode ] = useState(false)

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);

  const [ imgUrl, setImgUrl ] = useState("")

  const editHandler = () => {
    setEditAccountMode(!editAccountMode)
  }

  const handlerInputProfileEdit = (e) => {
    setLocalProfileInfo({
      ...localProfileInfo,
      [ e.target.name ]: e.target.value
    });
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
          dispatch({ type: 'UPDATE_PROFILE_INFO', payload: user });
          setLocalProfileInfo(user)
          setImgUrl(localProfileInfo.profileImg)

        } else {
          setLocalProfileInfo(user)
        }
      } else {
        alert("cannot reload the profile")
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
    const fullName = e.target.fullName.value
    const email = e.target.email.value
    const phoneNumber = e.target.phoneNumber.value
    if (profileInfo.isBusiness) {
      const address = e.target.address.value
      const business_name = e.target.business_name.value
      const business_description = e.target.business_description.value
      updateProfileBusiness(fullName, email, phoneNumber, address, business_name, business_description)
    } else {
      updateProfileUser(fullName, email, phoneNumber)
    }
    setEditAccountMode(!editAccountMode);

  };
  const updateProfileUser = async (fullName, email, phoneNumber) => {
    try {
      const response = await fetch('http://localhost:3001/users/updateUserProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profileInfo.email,
          fullName: fullName,
          phoneNumber: phoneNumber,
          emailNew: email
        })
      });

      const data = await response.json();

      if (response.ok) {

        if (data.user !== null) {

          showMessage(data.message, data.type)

          setLocalProfileInfo(data.user)
          localStorage.setItem("userData", JSON.stringify(localProfileInfo))
          dispatch({ type: 'UPDATE_PROFILE_INFO', payload: JSON.parse(localStorage.getItem('userData')) });

        }
      } else {
        showMessage(data.message, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const updateProfileBusiness = async (fullName, email, phone, address, business_name, description) => {
    try {
      const response = await fetch('http://localhost:3001/business/updateBusinessProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profileInfo.email,
          fullName: fullName,
          emailNew: email,
          business_name: business_name,
          address: address,
          business_phone: phone,
          business_description: description
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user !== null) {

          showMessage(data.message, data.type)
          setLocalProfileInfo(data.user)
        }
      } else {
        showMessage(data.message, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const [ filteredList, setFilteredList ] = useState([])
  let listOfInfoAndInput = [
    {
      id: 'fullName',
      name: 'fullName',
      type: 'text',
      label: 'fullName',
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
      id: 'phoneNumber',
      name: 'phoneNumber',
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

  useEffect(() => {
    if (!profileInfo.isBusiness) {
      setFilteredList(listOfInfoAndInput.filter(input => (
        input.name !== 'business_name' &&
        input.name !== 'business_description' &&
        input.name !== 'address'
      )))
    } else {
      setFilteredList(listOfInfoAndInput)
    }
  }, [ profileInfo.email ])

  const showLabelInputList = (
    <form onSubmit={ submitAccountForm }>
      <div>
        <div className="row gap-3 ps-3 mb-3 justify-content-center">
          { filteredList.map((input, key) => (
            <div className="" key={ key }>
              { editAccountMode ? (
                <FormInput
                  key={ key }
                  { ...input }
                  value={ localProfileInfo[ input.name ] }
                  onChange={ handlerInputProfileEdit }
                />
              ) : (
                <div>
                  <label className="form-label" htmlFor={ input.id }>
                    { input.label }
                  </label>
                  { localProfileInfo != null && <div>
                    <div>{ localProfileInfo[ input.name ] }</div>
                  </div> }
                </div>
              ) }
            </div>
          ))
          }
        </div>

        { editAccountMode && (
          <div className="d-flex justify-content-center">
            <button className="mb-3 text-center btn btn-primary" type="submit">
              Save changes
            </button>
          </div>
        ) }
      </div>
    </form>
  );

  return (

    <div className="container-xl px-4 mt-4 mb-4">
      <div className="d-flex flex-column justify-content-center gap-4 flex-wrap">
        <div className="row">

          <div className="d-flex col-md-5">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img className="img-fluid rounded-circle mb-4" src={ imgUrl ? `data:image/jpeg;base64,${imgUrl}` : "./logo512.png" } alt="" />
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
        <FavoritesList />
      </div>
    </div >
  )

}

export default AccountProfile