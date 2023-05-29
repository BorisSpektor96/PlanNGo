import { useState } from "react"

const Profile = () => {

  const [ editMode, setEditMode ] = useState(false)

  const editHandler = () => {
    setEditMode(!editMode)
  }

  const desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"

  const [ profileInfo, setProfileInfo ] = useState({
    firstname: "Boris",
    lastname: "Spektor",
    email: "mail@gmail.com",
    businessAddress: "Israel TLV",
    businessName: "Something",
    BusinessDescription: desc,
    phoneNumber: "05412345678",
    products: [],
    services: [],
  })

  const handlerProfileEdit = (e) => {
    setProfileInfo({ ...profileInfo, [ e.target.name ]: e.target.value });
  }

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const listOfInfoAndInput = [
    { id: 'firstname', name: 'firstname', type: 'text', labelText: 'First name', text: 'First Name' },
    { id: 'lastname', name: 'lastname', type: 'text', labelText: 'Last name', text: 'Last name' },
    { id: 'email', name: 'email', type: 'email', labelText: 'Email', text: 'Email' },
    { id: 'businessName', name: 'businessName', type: 'text', labelText: "Business Name", text: 'Business name' },
    { id: 'businessAddress', name: 'businessAddress', type: 'text', labelText: 'Business Address', text: 'Business Address' },
    { id: 'phoneNumber', name: 'phoneNumber', type: 'tel', labelText: 'Phone number', text: 'Phone number' },
  ]

  const showLabelInputList = (

    <form onSubmit={ submitHandler }>
      <div className="card xl-12">
        <div className="card-body d-flex flex-wrap gap-3 justify-content-center">
          { listOfInfoAndInput.map(({ tag, id, name, type, labelText }, key) => (
            < div className="col-md-5  col-12 d-flex flex-wrap" key={ key } >
              < label className="small" for={ id }>{ labelText } </label>
              {
                editMode
                  ? <input className="form-control" value={ profileInfo[ name ] } name={ name } onChange={ handlerProfileEdit } id={ id } type={ type } />
                  : <div className="">{ profileInfo[ name ] }</div>
              }
            </div>
          )) }

          < label className="small mb-0" for="BusinessDescription">Business Description: </label>
          { editMode
            ? <textarea rows="5" onChange={ handlerProfileEdit } name="BusinessDescription" value={ profileInfo.BusinessDescription } className="form-control" />
            : <div className="">{ profileInfo.BusinessDescription }</div>
          }
        </div>
        { editMode &&
          <button className="btn btn-primary" onClick={ editHandler } type="submit" >Save changes</button>
        }
      </div >
    </form >

  )


  return (
    <div className="container-xl px-4 mt-4 mb-4">
      <div className="d-flex gap-4 flex-wrap">
        <div className="row">

          <div className="col-xl-4">
            {/* <!-- Profile picture card--> */ }
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
            {/* <!-- Account details card--> */ }

            <div className="row d-flex mb-3">
              <div className="col-6 p-3">
                Account Details
              </div>
              { !editMode &&
                <div className="col-6 d-flex justify-content-end">
                  <button className="btn btn-outline-secondary" onClick={ editHandler }>
                    <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                    <lord-icon
                      src="https://cdn.lordicon.com/puvaffet.json"
                      trigger="hover"
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
export default Profile