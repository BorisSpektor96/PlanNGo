

const AppointmentItem = props => {

  const date = props.item.date
  const service = props.item.service
  const businessDetails = props.item.businessDetails
  return (
    <li className="d-flex card justify-content-between rounded border-primary m-1 align-items-center p-2">

      <div className="d-flex flex-column justify-content-between">
        <p className="p-1">{ businessDetails.name }</p>
        <p className="p-1"> { businessDetails.email }</p>
        <p className="p-1"> { businessDetails.address }</p>
      </div>
      <div className="d-flex justify-content-between">
        <p className="p-1"> { service.name }</p>
      </div>
      <div className="d-flex">
        <div>
          <button className="btn ">
            <lord-icon
              src="https://cdn.lordicon.com/kbtmbyzy.json"
              trigger="loop"
              colors="primary:#121331,secondary:#e83a30"
              state="loop"
              styles="width:250px;height:250px"
            ></lord-icon>
          </button>
        </div>
        <div>
          <button className="btn ">
            <lord-icon
              src="https://cdn.lordicon.com/gclzwloa.json"
              trigger="hover"
              colors="primary:#4030e8,secondary:#c71f16"
              styles="width:250px;height:250px"
            ></lord-icon>
          </button>
        </div>
      </div>
    </li>
  )

}

export default AppointmentItem