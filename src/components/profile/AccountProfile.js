import { useState, useContext, useEffect } from "react"
import FormInput from "../forms/FormInput"
import './profile.css'
import FavoritesList from "../favorites/FavoritesList";
import { PopupMessageContext } from "../../PopupMessage";
import AppointmentsProfile from "./AppointmentsProfile";
import ChangePassword from "../forms/ChangePassword";
import { updateProfileInfo } from './../../profileInfoSlice'
import { useSelector, useDispatch } from "react-redux";

const AccountProfile = () => {

  const dispatch = useDispatch()
  const [ bType, setBType ] = useState("");
  const profileInfo = useSelector((state) => state.profileInfo);

  const { showMessage } = useContext(PopupMessageContext)

  const [ editAccountMode, setEditAccountMode ] = useState(false)

  const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);

  const [ editImgProfile, setEditImgProfile ] = useState(false)

  const [ imgUrl, setImgUrl ] = useState("")

  const [ showChangePassword, setShowChangePassword ] = useState(false)
  const [ filteredList, setFilteredList ] = useState([])

  const showChangePasswordHandler = () => {
    setShowChangePassword(!showChangePassword);
  };

  const editAccountHandler = () => {
    setEditAccountMode(!editAccountMode)
  }

  const editImgHandler = () => {
    setEditImgProfile(!editImgProfile)
  }

  const handlerInputProfileEdit = (e) => {
    setLocalProfileInfo({
      ...localProfileInfo,
      [ e.target.name ]: e.target.value
    });
  };

  useEffect(() => {
    setLocalProfileInfo(profileInfo)
    setImgUrl(profileInfo.profileImg)
  }, []);

  const submitAccountForm = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value
    const email = e.target.email.value
    const phoneNumber = e.target.phoneNumber.value
    if (profileInfo.isBusiness) {
      const address = e.target.address.value
      const business_name = e.target.business_name.value
      const business_description = e.target.business_description.value
      updateProfileBusiness(fullname, email, phoneNumber, address, business_name, business_description)
    } else {
      updateProfileUser(fullname, email, phoneNumber)
    }
    setEditAccountMode(!editAccountMode);

  };
  const updateProfileUser = async (fullname, email, phoneNumber) => {
    try {
      const response = await fetch('http://localhost:3001/users/updateUserProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: localProfileInfo.email,
          fullname: fullname,
          phoneNumber: phoneNumber,
          emailNew: email
        })
      });

      const data = await response.json();

      if (response.ok) {

        if (data.user !== null) {

          showMessage(data.message, data.type)

          setLocalProfileInfo(data.user)
          localStorage.setItem("userData", JSON.stringify(localProfileInfo.email))
          dispatch(updateProfileInfo(data.user))
        }
      } else {
        showMessage(data.message, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const updateProfileBusiness = async (fullname, email, phone, address, business_name, description) => {
    try {
      const response = await fetch('http://localhost:3001/business/updateBusinessProfile', {
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

      const data = await response.json();
      if (response.ok) {
        if (data.user !== null) {

          showMessage(data.message, data.type)
          setLocalProfileInfo(data.user)
          localStorage.setItem("userData", JSON.stringify(localProfileInfo.email))
          dispatch(updateProfileInfo(data.user))
        }
      } else {
        showMessage(data.message, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  let listOfInfoAndInput = [
    {
      id: 'fullname',
      name: 'fullname',
      type: 'text',
      label: 'Fullname',
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


      </div>

      <button
        className="m-2 btn btn-primary btn-sm"
        type="button"
        onClick={ () => {
          showChangePasswordHandler();
          setBType("changePassword");
        } }
      >
        Change Password
      </button>

      <button
        className="m-2 btn btn-primary btn-sm"
        type="button"
        onClick={ () => {
          showChangePasswordHandler();
          setBType("forgotPassword");
        } }
      >
        Forgot Password
      </button>
      { editAccountMode && (
        <div className="d-flex justify-content-center">
          <button className="mb-3 text-center btn btn-primary" type="submit">
            Save changes
          </button>
        </div>
      ) }
    </form>
  );

  const imgUploadHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/users/imgUpdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: localProfileInfo.email,
          profileImg: imgUrl
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user !== null) {
          showMessage(data.message, data.type)
          setLocalProfileInfo(data.user)
          dispatch(updateProfileInfo(data.user))
          editImgHandler()
        }
      } else {
        showMessage(data.message, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const onFileChange = (e) => {
    const selectedFile = e.target.files[ 0 ];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result.split(",")[ 1 ])
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>

      <div className="container-xl px-4 mt-4 mb-4">
        <div className="d-flex flex-column flex-wrap">
          <div className="d-flex flex-wrap gap-4 justify-content-around">

            <div className="col-md-5 d-flex justify-content-center">
              <div className="card">
                <div className="card-header d-flex justify-content-around mb-2">
                  <div className="d-flex align-items-center">Profile Picture</div>
                  { !editImgProfile &&
                    <div className="d-flex justify-content-end">
                      <button className="border-0" onClick={ editImgHandler }>
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
                <div className="card-body text-center d-flex flex-column justify-content-center">

                  <img style={ { width: '100%', maxWidth: '200px', maxHeight: '250px' } } className="img-thumbnail mb-2" src={ imgUrl ? `data:image/jpeg;base64,${imgUrl}` : "" } alt="" />
                  <div className="small font-italic text-muted">
                    { editImgProfile &&
                      <form className="d-flex flex-column" onSubmit={ imgUploadHandler }>
                        <input type="file" name="profileImg" onChange={ onFileChange } />
                        <button className="mt-3 btn btn-primary" type="submit">Upload new image</button>
                      </form>
                    }

                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 d-flex justify-content-center">
              <div className="card">
                <div className="card-header d-flex justify-content-around mb-2">
                  <div className="d-flex align-items-center">
                    Account Details
                  </div>
                  { !editAccountMode &&
                    <div className="d-flex justify-content-end">
                      <button className="border-0" onClick={ editAccountHandler }>
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
              { showChangePassword &&
                <ChangePassword
                  profileInfo={ profileInfo }
                  onClose={ showChangePasswordHandler }
                  bType={ bType }
                />
              }

            </div>

          </div>
          <div className="d-flex justify-content-around flex-wrap">
            {
              !profileInfo.isBusiness
              &&
              <FavoritesList />
            }
          </div>
          <div >
            <AppointmentsProfile />
          </div>



        </div>
      </div >

    </>
  )

}

export default AccountProfile
