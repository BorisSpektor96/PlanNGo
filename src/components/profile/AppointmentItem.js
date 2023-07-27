

const AppointmentItem = props => {


  return (
    <li className="d-flex justify-content-between rounded border-primary m-1 align-items-center p-2">

      <div className="d-flex justify-content-between align-items-baseline ">
        <p className="p-1"> { props.name }</p>
        <p className="p-1">{ props.service }</p>
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
          <button className="btn " value={ props.id } onClick={ () => {
            props.deleteFavItem(props.id)
          } }>
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